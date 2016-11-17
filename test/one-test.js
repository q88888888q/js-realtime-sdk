import { default as d } from 'debug';
import 'should';
import 'should-sinon';
import should from 'should/as-function';
import Realtime from '../src/realtime';
import IMClient from '../src/im-client';
import Conversation from '../src/conversation';
import Message, { MessageStatus } from '../src/messages/message';
import TypedMessage from '../src/messages/typed-message';
import TextMessage from '../src/messages/text-message';
import { messageType, messageField, IE10Compatible } from '../src/messages/helpers';
import { internal } from '../src/utils';
import { sinon, listen } from './test-utils';
const debug = d('LC:Test');
import {
  APP_ID,
  REGION,
  EXISTING_ROOM_ID,
  NON_EXISTING_ROOM_ID,
  CLIENT_ID,
  WS_SERVER
} from './configs';

@messageType(1)
@messageField('foo')
class CustomMessage extends TypedMessage {
  constructor(foo) {
    super();
    this.foo = foo;
  }
}

describe('IMClient', () => {
  let client;
  let realtime;
  before(() => {
    realtime = new Realtime({
      appId: APP_ID,
      region: REGION,
      server:WS_SERVER,
      pushUnread: false,
    });
    return realtime
      .createIMClient(CLIENT_ID)
      .then(c => (client = c));
  });

  after(() => realtime._close());
  describe('create and close', () => {
    it('normal create and close', () => {
      //var cid = '58131e468ac247004fa91d41';//ln
      var cid = '582139d5128fe1005a16058d';//ln
      //var cid = '58079dbf9b1eaf34284a52b7'; //qiankun]
      return client.getConversation(cid).then(leeyehC =>
      {
        return leeyehC.send(new TextMessage("hi")).then(function(res){
          console.log(res);
        });
        //主动加入
        /*
        return leeyehC.join().then(leeyehC.add(['wangtr','chensf'])).then((c)=>{
          return listen(client, 'membersjoined').then(([payload, conv]) => {
            debug(payload);
          });
        });
        */
      }
      ) ;
    });
  });
});
