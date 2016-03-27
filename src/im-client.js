import Client from './client';
import Conversation from './conversation';
import ConversationQuery from './conversation-query';
import {
  GenericCommand,
  SessionCommand,
  ConvCommand,
  AckCommand,
  JsonObjectMessage,
  CommandType,
  OpType,
} from '../proto/message';
import * as Errors from './errors';
import { Promise } from 'rsvp';
import throttle from 'lodash/throttle';
import { tap, Cache, keyRemap, union, difference, trim } from './utils';
import { default as d } from 'debug';
import { version as VERSION } from '../package.json';

const debug = d('LC:IMClient');

export default class IMClient extends Client {
  /**
   * 无法直接实例化，请使用 {@link Realtime#createIMClient} 创建新的 IMClient。
   *
   * @param  {String} [id] 客户端 id
   * @param  {Object} [options]
   * @param  {Function} [options.signatureFactory] open session 时的签名方法 // TODO need details
   */
  constructor(...args) {
    /**
     * @var id {String} 客户端 id
     * @memberof IMClient#
     */
    super(...args);
    if (!this._messageParser) {
      throw new Error('IMClient must be initialized with a MessageParser');
    }
    this._conversationCache = new Cache(`client:${this.id}`);
    this._ackMessageBuffer = {};
    [
      'invited',
      'kicked',
      'membersjoined',
      'membersleft',
      'message',
      'unhandledmessage',
    ].forEach(event => this.on(
      event,
      payload => this._debug(`${event} event emitted.`, payload)
    ));
  }

  _debug(...params) {
    debug(...params, `[${this.id}]`);
  }

  /**
   * @override
   * @private
   */
  _dispatchMessage(message) {
    this._debug(trim(message), 'received');
    if (message.cmd === CommandType.conv) {
      return this._dispatchConvMessage(message);
    }
    if (message.cmd === CommandType.direct) {
      return this._dispatchDirectMessage(message);
    }
    if (message.cmd === CommandType.session) {
      return this._dispatchSessionMessage(message);
    }
    this.emit('unhandledmessage', message);
    return Promise.resolve();
  }

  _dispatchSessionMessage(message) {
    const {
      sessionMessage: {
        code, reason,
      },
    } = message;
    switch (message.op) {
      case OpType.closed: {
        if (code === Errors.SESSION_CONFLICT.code) {
          this.emit('conflict', {
            code, reason,
          });
        }
        return this.emit('close', {
          code, reason,
        });
      }
      default:
        this.emit('unhandledmessage', message);
        return Promise.reject(new Error('Unrecognized session command'));
    }
  }

  _dispatchConvMessage(message) {
    const {
      convMessage,
      convMessage: {
        initBy, m,
      },
    } = message;
    switch (message.op) {
      case OpType.joined: {
        return this.getConversation(convMessage.cid).then(
          conversation => this.emit('invited', {
            conversation,
            invitedBy: initBy,
          })
        );
      }
      case OpType.left: {
        return this.getConversation(convMessage.cid).then(conversation => {
          // eslint-disable-next-line no-param-reassign
          conversation.members = difference(conversation.members, [this.id]);
          const payload = {
            kickedBy: initBy,
          };
          this.emit('kicked', Object.assign({
            conversation,
          }, payload));
          conversation.emit('kicked', payload);
        });
      }
      case OpType.members_joined: {
        return this.getConversation(convMessage.cid).then(conversation => {
          // eslint-disable-next-line no-param-reassign
          conversation.members = union(conversation.members, convMessage.m);
          const payload = {
            invitedBy: initBy,
            members: m,
          };
          this.emit('membersjoined', Object.assign({
            conversation,
          }, payload));
          conversation.emit('membersjoined', payload);
        });
      }
      case OpType.members_left: {
        return this.getConversation(convMessage.cid).then(conversation => {
          // eslint-disable-next-line no-param-reassign
          conversation.members = difference(conversation.members, convMessage.m);
          const payload = {
            kickedBy: initBy,
            members: m,
          };
          this.emit('membersleft', Object.assign({
            conversation,
          }, payload));
          conversation.emit('membersleft', payload);
        });
      }
      default:
        this.emit('unhandledmessage', message);
        return Promise.reject(new Error('Unrecognized conversation command'));
    }
  }

  _dispatchDirectMessage(originalMessage) {
    const {
      directMessage,
      directMessage: {
        id, cid, fromPeerId, timestamp, transient,
      },
    } = originalMessage;
    return this.getConversation(directMessage.cid).then(conversation => {
      const messageProps = {
        id,
        cid,
        timestamp: new Date(timestamp.toNumber()),
        from: fromPeerId,
        transient,
      };
      const message = this._messageParser.parse(directMessage.msg);
      Object.assign(message, messageProps);
      conversation.lastMessage = message; // eslint-disable-line no-param-reassign
      conversation.lastMessageAt = message.timestamp; // eslint-disable-line no-param-reassign
      this.emit('message', {
        conversation,
        message,
      });
      conversation.emit('message', message);
      if (!(transient || conversation.transient)) {
        this._sendAck(message);
      }
    });
  }

  _sendAck(message) {
    this._debug('send ack for', message);
    const { cid } = message;
    if (!cid) {
      return Promise.reject(new Error('missing cid'));
    }
    if (!this._ackMessageBuffer[cid]) {
      this._ackMessageBuffer[cid] = [];
    }
    this._ackMessageBuffer[cid].push(message);
    if (!this._doSendAckThrottled) {
      this._doSendAckThrottled = throttle(this._doSendAck.bind(this), 1000);
    }
    return this._doSendAckThrottled();
  }

  _doSendAck() {
    if (!this._connection.is('connected')) {
      // if not connected, just skip everything
      return Promise.resolve();
    }
    debug('do send ack', this._ackMessageBuffer);
    return Promise.all(Object.keys(this._ackMessageBuffer).map(cid => {
      const convAckMessages = this._ackMessageBuffer[cid];
      const timestamps = convAckMessages.map(message => message.timestamp);
      const command = new GenericCommand({
        cmd: 'ack',
        ackMessage: new AckCommand({
          cid,
          fromts: Math.min.apply(null, timestamps),
          tots: Math.max.apply(null, timestamps),
        }),
      });
      return this._send(command, false).then(() => delete this._ackMessageBuffer[cid]);
    }));
  }

  _send(cmd, ...args) {
    const command = cmd;
    if (this.id) {
      command.peerId = this.id;
    }
    return this._connection.send(command, ...args);
  }

  _open(appId, tag, deviceId, isReconnect = false) {
    this._debug('open session');
    return Promise
      .resolve(new GenericCommand({
        cmd: 'session',
        op: 'open',
        appId,
        sessionMessage: new SessionCommand({
          ua: `js/${VERSION}`,
          r: isReconnect,
          tag,
          deviceId,
        }),
      }))
      .then(cmd => {
        const command = cmd;
        if (this.options.signatureFactory) {
          this._debug(`call signatureFactory with [${this.id}]`);
          return Promise
            .resolve()
            .then(() => this.options.signatureFactory(this.id))
            .then(tap(signatureResult => this._debug('signatureResult', signatureResult)))
            .then((signatureResult = {}) => {
              const {
                signature,
                timestamp,
                nonce,
              } = signatureResult;
              if (typeof signature !== 'string'
                  || typeof timestamp !== 'number'
                  || typeof nonce !== 'string') {
                throw new Error('malformed signature');
              }
              Object.assign(command.sessionMessage, {
                s: signature,
                t: timestamp,
                n: nonce,
              });
              return command;
            }, error => {
              this._debug(error);
              throw new Error(`signatureFactory error: ${error.message}`);
            });
        }
        return command;
      })
      .then(this._send.bind(this))
      .then(resCommand => {
        const peerId = resCommand.peerId;
        if (!peerId) {
          console.warn('Unexpected session opened without peerId.');
          return;
        }
        this.id = peerId;
      });
  }

  /**
   * 关闭客户端
   * @return {Promise}
   */
  close() {
    this._debug('close session');
    const command = new GenericCommand({
      cmd: 'session',
      op: 'close',
    });
    return this._send(command).then(
      () => {
        this.emit('close', {
          code: 0,
        });
      }
    );
  }
  /**
   * 获取 client 列表中在线的 client，每次查询最多 20 个 clientId，超出部分会被忽略
   * @param  {String[]} clientIds 要查询的 client ids
   * @return {Primse.<String[]>} 在线的 client ids
   */
  ping(clientIds) {
    this._debug('ping');
    if (!(clientIds instanceof Array)) {
      throw new TypeError(`clientIds ${clientIds} is not an Array`);
    }
    const command = new GenericCommand({
      cmd: 'session',
      op: 'query',
      sessionMessage: new SessionCommand({
        sessionPeerIds: clientIds,
      }),
    });
    return this._send(command)
      .then(resCommand => resCommand.sessionMessage.onlineSessionPeerIds);
  }

  /**
   * 获取某个特定的 conversation
   * @param  {String} id 对话 id，对应 _Conversation 表中的 objectId
   * @return {Promise.<Conversation>}
   */
  getConversation(id) {
    if (typeof id !== 'string') {
      throw new TypeError(`${id} is not a String`);
    }
    const cachedConversation = this._conversationCache.get(id);
    if (cachedConversation) {
      return Promise.resolve(cachedConversation);
    }
    return this
      .getQuery()
      .equalTo('objectId', id)
      .find()
      .then(conversations => conversations[0] || null);
  }

  /**
   * 构造一个 ConversationQuery 来查询对话
   * @return {ConversationQuery}
   */
  getQuery() {
    return new ConversationQuery(this);
  }

  _executeQuery(query) {
    const queryJSON = query.toJSON();
    queryJSON.where = new JsonObjectMessage({
      data: JSON.stringify(queryJSON.where),
    });
    const command = new GenericCommand({
      cmd: 'conv',
      op: 'query',
      convMessage: new ConvCommand(queryJSON),
    });
    return this
      ._send(command)
      .then(resCommand => {
        try {
          return JSON.parse(resCommand.convMessage.results.data);
        } catch (error) {
          const commandString = JSON.stringify(trim(resCommand));
          throw new Error(`Parse query result failed: ${error.message}. Command: ${commandString}`);
        }
      })
      .then(conversations => conversations.map(this._parseConversationFromRawData.bind(this)))
      .then(conversations => conversations.map(fetchedConversation => {
        let conversation = this._conversationCache.get(fetchedConversation.id);
        if (!conversation) {
          conversation = fetchedConversation;
          this._debug('no match, set cache');
          this._conversationCache.set(fetchedConversation.id, fetchedConversation);
        } else {
          this._debug('update cached conversation');
          [
            'name',
            'creator',
            'createdAt',
            'updatedAt',
            'lastMessageAt',
            'lastMessage',
            'mutedMembers',
            'members',
            '_attributes',
            'transient',
            'muted',
          ].forEach(key => {
            const value = fetchedConversation[key];
            if (value !== null) conversation[key] = value;
          });
          delete conversation._pendingAttributes;
          delete conversation._pendingName;
        }
        return conversation;
      }));
  }

  _parseConversationFromRawData(rawData) {
    const data = keyRemap({
      objectId: 'id',
      lm: 'lastMessageAt',
      msg: 'lastMessage',
      m: 'members',
      attr: 'attributes',
      tr: 'transient',
      c: 'creator',
      mu: 'mutedMembers',
    }, rawData);
    if (data.lastMessage) {
      data.lastMessage = this._messageParser.parse(data.lastMessage);
    }
    return new Conversation(data, this);
  }

  /**
   * 创建一个 conversation
   * @param {Object} options
   * @param {String[]} options.members 对话的初始成员列表，默认包含当前 client
   * @param {String} [options.name] 对话的名字
   * @param {Object} [options.attributes] 额外属性
   * @param {Boolean} [options.transient=false] 暂态会话
   * @param {Boolean} [options.unique=false] 唯一对话，当其为 true 时，如果当前已经有相同成员的对话存在则返回该对话，否则会创建新的对话
   * @return {Promise.<Conversation>}
   */
  createConversation(options = {}) {
    let attr = {};
    const {
      name,
      attributes,
      members,
      transient,
      unique,
    } = options;
    if (!Array.isArray(members)) {
      throw new TypeError(`conversation members ${members} is not an array`);
    }
    if (name) {
      if (typeof name !== 'string') {
        throw new TypeError(`conversation name ${name} is not a string`);
      }
      attr.name = name;
    }
    if (attributes) {
      attr.attr = attributes;
    }
    attr = new JsonObjectMessage({
      data: JSON.stringify(attr),
    });

    const startCommandJson = {
      m: members,
      attr,
      transient,
      unique,
    };

    const command = new GenericCommand({
      cmd: 'conv',
      op: 'start',
      convMessage: new ConvCommand(startCommandJson),
    });

    return this
      ._send(command)
      .then(resCommand => new Conversation(Object.assign({}, options, {
        id: resCommand.convMessage.cid,
        createdAt: resCommand.convMessage.cdate,
        updatedAt: resCommand.convMessage.cdate,
        lastMessageAt: null,
        creator: this.id,
        members: members.concat([this.id]),
      }), this))
      .then(tap(conversation =>
        this._conversationCache.set(conversation.id, conversation)
      ));
  }
}
