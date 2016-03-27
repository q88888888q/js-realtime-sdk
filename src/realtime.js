import Connection from './connection';
import * as Errors from './errors';
import { Promise } from 'rsvp';
import { default as d } from 'debug';
import EventEmitter from 'eventemitter3';
import { default as superagentPromise } from 'superagent-promise';
import superagent from 'superagent';
import uuid from 'uuid';
import { tap, Cache, trim } from './utils';
import Client from './client';
import IMClient from './im-client';
import MessageParser from './message-parser';
import Message from './messages/message';
import TextMessage from './messages/text-message';

const agent = superagentPromise(superagent, Promise);
const debug = d('LC:Realtime');

export default class Realtime extends EventEmitter {
  /**
   * @param  {Object} options
   * @param  {String} options.appId
   * @param  {String} options.appKey
   * @param  {String} [options.region='cn'] 节点 id
   * @param  {Boolean} [options.pushOfflineMessages=false] 启用推送离线消息模式（默认为发送未读消息通知模式）
   * @param  {Boolean} [options.ssl=true] 使用 wss 进行连接
   */
  constructor(options) {
    debug('initializing Realtime');
    super();
    if (typeof options.appId !== 'string') {
      throw new TypeError(`appId [${options.appId}] is not a string`);
    }
    if (typeof options.appKey !== 'string') {
      throw new TypeError('appKey is not a string');
    }
    this._options = Object.assign({
      appId: undefined,
      appKey: undefined,
      region: 'cn',
      pushOfflineMessages: false,
      ssl: true,
    }, options);
    this._id = uuid.v4();
    this._cache = new Cache('endpoints');
    this._clients = {};
    this._messageParser = new MessageParser();
    [
      Message,
      TextMessage,
    ].forEach(this._messageParser.register.bind(this._messageParser));
  }

  _open() {
    if (this._openPromise) return this._openPromise;

    let protocolsVersion = 3;
    if (this._options.pushOfflineMessages) {
      // 不推送离线消息，而是发送对话的未读通知
      protocolsVersion = 1;
    }
    const protocol = `lc.protobuf.${protocolsVersion}`;

    this._openPromise = new Promise((resolve, reject) => {
      debug('No connection established, create a new one.');
      const connection = new Connection(
        () => this._getEndpoints(this._options),
        protocol
      );
      connection.binaryType = 'arraybuffer';
      connection.on('open', () => resolve(connection));
      connection.on('error', reject);
      connection.on('message', this._dispatchMessage.bind(this));
      // event proxy
      ['disconnect', 'reconnect', 'retry'].forEach(
        event => connection.on(event, payload => {
          debug(`${event} event emitted.`, payload);
          this.emit(event, payload);
        })
      );
      // override handleClose
      connection.handleClose = function handleClose(event) {
        const fatalError = Array.find([
          Errors.APP_NOT_AVAILABLE,
          Errors.INVALID_LOGIN,
          Errors.INVALID_ORIGIN,
        ], error => error.code === event.code);
        if (fatalError) {
          // in these cases, SDK should throw.
          const error = new Error(`${fatalError.message || event.reason}`);
          error.code = event.code;
          this.throw(error);
        } else {
          // reconnect
          this.disconnect();
        }
      };
    });

    return this._openPromise;
  }

  _getEndpoints(options) {
    return Promise.resolve(
      this._cache.get('endpoints') ||
      this
        .constructor
        ._fetchEndpointsInfo(options)
        .then(
          tap(info => this._cache.set('endpoints', info, info.ttl))
        )
    )
    .then(info => {
      debug('endpoint info:', info);
      return [info.server, info.secondary];
    });
  }

  static _fetchEndpointsInfo({ appId, region, ssl, _debug }) {
    debug('fetch endpoint info');
    let router;
    switch (region) {
      case 'cn':
        router = 'router-g0-push.leancloud.cn/v1/route';
        break;
      case 'us':
        router = 'router-a0-push.leancloud.cn/v1/route';
        break;
      default:
        throw new Error(`Region [${region}] is not supported.`);
    }
    const protocol = global.location ? '//' : 'https://';

    return agent
      .get(`${protocol}${router}`)
      .query({
        appId,
        secure: ssl,
        debug: _debug,
        _t: Date.now(),
      })
      .timeout(20000)
      .then(
        res => res.body
      );
  }

  _close() {
    if (this._openPromise) {
      this._openPromise.then(connection => connection.close());
    }
    delete this._openPromise;
  }

  _register(client) {
    if (!(client instanceof Client)) {
      throw new TypeError(`${client} is not a Client`);
    }
    if (!client.id) {
      throw new Error('Client must have an id to be registered');
    }
    this._clients[client.id] = client;
  }

  _deregister(client) {
    if (!(client instanceof Client)) {
      throw new TypeError(`${client} is not a Client`);
    }
    if (!client.id) {
      throw new Error('Client must have an id to be deregistered');
    }
    delete this._clients[client.id];
    if (Object.getOwnPropertyNames(this._clients).length === 0) {
      this._close();
    }
  }

  _dispatchMessage(message) {
    if (message.peerId !== null) {
      const client = this._clients[message.peerId];
      if (client) {
        return Promise.resolve(client._dispatchMessage(message)).catch(debug);
      }
      return debug(
        '[WARN] Unexpected message received without any live client match',
        trim(message)
      );
    }
    return debug('[WARN] Unexpected message received without peerId', trim(message));
  }

  /**
   * 创建一个即时通讯客户端
   * @param  {String} [id] 客户端 id，如果不指定，服务端会随机生成一个
   * @param  {Object} [clientOptions] 详细参数 @see {@link IMClient}
   * @param  {String} [tag] 客户端类型标记，以支持单点登录功能
   * @return {Promise.<IMClient>}
   */
  createIMClient(id, clientOptions, tag) {
    if (id) {
      if (this._clients[id] !== undefined) {
        return Promise.reject(new Error(`IMClient[${id}] is already created`));
      }
      this._clients[id] = null;
    }
    return this._open().then(connection => {
      const client = new IMClient(id, clientOptions, connection, {
        _messageParser: this._messageParser,
      });
      connection.on('reconnect', () => client._open(this._options.appId, tag, this._id, true));
      client.on('close', () => this._deregister(client), this);
      return client._open(this._options.appId, tag, this._id)
        .then(() => {
          this._register(client);
          return client;
        });
    });
  }

  createPushClient() {
    return this._open();
  }

  /**
   * 注册消息类
   *
   * 在接收消息、查询消息时，会按照消息类注册顺序的逆序依次尝试解析消息内容
   *
   * @param  {Function} messageClass 消息类，需要实现 {@link AVMessage} 接口，建议继承自 {@link Message}
   * @throws {TypeError} 如果 messageClass 没有实现 {@link AVMessage} 接口则抛出异常
   */
  register(...params) {
    return this._messageParser.register(...params);
  }
}
