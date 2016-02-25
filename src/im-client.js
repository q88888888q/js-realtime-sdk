import Client from './client';
import Conversation from './conversation';
import ConversationQuery from './conversation-query';
import {
  GenericCommand,
  SessionCommand,
  ConvCommand,
  JsonObjectMessage,
  CommandType,
  OpType,
} from '../proto/message';
import { Promise } from 'rsvp';
import { tap, Cache, keyRemap, difference } from './utils';
import { default as d } from 'debug';
import { version as VERSION } from '../package.json';

const debug = d('LC:IMClient');

export default class IMClient extends Client {
  constructor(...args) {
    super(...args);
    this._conversationCache = new Cache(`client:${this.id}`);
  }

  _dispatchMessage(message) {
    if (message.cmd === CommandType.conv) {
      return this._dispatchConvMessage(message);
    }
    return this.emit('unhandledmessage', message);
  }

  _dispatchConvMessage(message) {
    const { convMessage, initBy } = message;
    switch (message.op) {
      case OpType.joined: {
        let conversation = this._conversationCache.get(convMessage.cid);
        // 如果缓存中存在这个 conversation, 且已经有当前 client 了, 则不再派发事件 (可能是当前 client 发起的)
        if (conversation && new Set(conversation.members).has(this.id)) break;
        conversation = this.getConversation(convMessage.cid);
        this.emit('invited', {
          conversation,
          invitedBy: initBy,
        });
        return;
      }
      case OpType.left: {
        let conversation = this._conversationCache.get(convMessage.cid);
        // 如果缓存中不存在这个 conversation, 不派发事件
        if (!conversation) break;
        conversation = this.getConversation(convMessage.cid);
        const members = new Set(conversation.members);
        // 如果该 conversation 不包含当前 client, 不派发事件 (可能是当前 client 发起的)
        if (!members.has(this.id)) break;
        conversation.members = difference(members, [this.id]);
        const event = {
          kickedBy: initBy,
        };
        this.emit('kicked', Object.assign({
          conversation,
        }, event));
        conversation.emit('kicked', event);
        return;
      }
      default:
    }
  }

  _send(cmd) {
    const command = cmd;
    if (this.id) {
      command.peerId = this.id;
    }
    return this._connection.send(command);
  }

  _open(appId, isReconnect = false) {
    debug('open session');
    return Promise
      .resolve(new GenericCommand({
        cmd: 'session',
        op: 'open',
        appId,
        sessionMessage: new SessionCommand({
          ua: `js/${VERSION}`,
          r: isReconnect,
        }),
      }))
      .then(cmd => {
        const command = cmd;
        if (this.options.signatureFactory) {
          debug(`call signatureFactory with [${this.id}]`);
          return Promise
            .resolve()
            .then(() => this.options.signatureFactory(this.id))
            .then(tap(signatureResult => debug('signatureResult', signatureResult)))
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
              debug(error);
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

  close() {
    debug('close session');
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

  ping(ids) {
    debug('ping');
    if (!(ids instanceof Array)) {
      throw new TypeError(`ids ${ids} is not an Array`);
    }
    const command = new GenericCommand({
      cmd: 'session',
      op: 'query',
      sessionMessage: new SessionCommand({
        sessionPeerIds: ids,
      }),
    });
    return this._send(command)
      .then(resCommand => resCommand.sessionMessage.onlineSessionPeerIds);
  }

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
      .then(resCommand => JSON.parse(resCommand.convMessage.results.data))
      .then(conversations => conversations.map(this._parseConversationFromRawData.bind(this)))
      .then(conversations => conversations.map(fetchedConversation => {
        let conversation = this._conversationCache.get(fetchedConversation.id);
        if (!conversation) {
          conversation = fetchedConversation;
          debug('no match, set cache');
          this._conversationCache.set(fetchedConversation.id, fetchedConversation);
        } else {
          debug('update cached conversation');
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
            'isTransient',
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
      tr: 'isTransient',
      c: 'creator',
      mu: 'mutedMembers',
    }, rawData);
    return new Conversation(data, this);
  }

  createConversation(options = {}) {
    let attr = {};
    const {
      name,
      attributes,
      members,
      isTransient,
      isUnique,
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
      transient: isTransient,
      unique: isUnique,
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
