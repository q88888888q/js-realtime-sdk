import { default as d } from 'debug';
import Realtime from '../src/realtime';
import IMClient from '../src/im-client';
import Conversation from '../src/conversation';
import Message, { MessageStatus } from '../src/messages/message';
import TypedMessage from '../src/messages/typed-message';
import TextMessage from '../src/messages/text-message';
import { messageType, messageField, IE10Compatible } from '../src/messages/helpers';
import { internal } from '../src/utils';
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

function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}

let cfg = {
  appId: APP_ID,
  region: REGION,
  server:WS_SERVER,
  pushUnread: false,
};
new Realtime(cfg).createIMClient('test_wangtr').then(client => {
  console.log("created ok");
  client.on('message',function(msg){
    console.log('onMessage',msg.getAttributes());
  });
});
