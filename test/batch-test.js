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
let sendCount = 0;
let NewClients = {};
let clients = [];
let convs = [];
let msg_send = 0;//发送消息数计数
let msg_recv = 0;
let num_query = 0;
let num_join = 0;
let set_begin_num = process.env.test_begin_num||0;//todo 开始数
let allnum = process.env.test_client_num||10;// 测试 客户端数 todo 配置
let test_msg_num = process.env.test_msg_num||1;//测试配置，每人人发消息数 todo 配置
var startTime = new Date().getTime();//起始时间
let cid = REGION == 'qiankun'?'58079dbf9b1eaf34284a52b7':'58131e468ac247004fa91d41';
//批量创建并发客户端
const batchCreateClients = function(allnum){
  console.log('start batchCreateClients');
  console.log('set test_client_num='+allnum);
  console.log('set test_msg_num='+test_msg_num);
  return new Promise((resolve, reject) => {
    for (var i = 0; i < allnum; i++) {
      var func = (function (i) {
        return function (client) {
          if(client) {
            clients.push(client);
          }
          else{
            console.log("error batchCreateClients============:",i);
          }
          if (clients.length >= allnum) {
            resolve(allnum);
          }
        }
      })(i);
      new Realtime(cfg).createIMClient('test_' + (set_begin_num++)).then(client => {
        client.on('message', function (message, conversation) {
          if(msg_recv == 0 ){
            step_startTime = new Date().getTime();//起始时间
            step_startTimeFormat = getNowFormatDate();
            console.log(step_startTimeFormat,"start:"+msg_recv);
          }
          msg_recv ++;
          //console.log(getNowFormatDate()+':',msg_recv,client.id + ' received message from ' + message.from + ':' + message.text);
          //全部消息接收完
          //if(msg_recv >= allnum *sendCount*(allnum-1)) {
          if(msg_recv >= sendCount*allnum) {
            var end = new Date().getTime();//起始时间
            console.log(getNowFormatDate(),"finished received:" + msg_recv+" runtime:"+(end-step_startTime)+" ms",message.from + ':' + message.text);
            msg_recv = 0;
          }
        });
        return client;
      }).then(func);
    }
  })
};

const batchQueryConv = function(clients){
  var allnum = clients.length;
  return new Promise((resolve, reject) => {
    for(var i in clients){
      var func = (function (i) {
        return function (conv) {
          convs.push(conv);
          if (convs.length >= allnum) {
            resolve(allnum);
          }
        }
      })(i);
      if(!clients[i]){
        console.error("error=================:"+k);
      }
      else{
        clients[i].getConversation(cid).then(func);
      }
    }

  });
};

const batchJoinConv = function(convs){
  var allnum = convs.length;
  return new Promise((resolve, reject) => {
    var finished = 0;
    for(let i in convs){
      var func = (function (i) {
        return function (conv) {
          finished ++;
          if (finished >= allnum) {
            resolve(allnum);
          }
        }
      })(i);
      convs[i].join().then(func);
    }
  });
};

const batchSendConv = function(convs){
  var allnum = convs.length;
  return new Promise((resolve, reject) => {
    var finished = 0;
    for(let i in convs){
      var func = (function (i) {
        return function (conv) {
          finished ++;
          if (finished >=  allnum * test_msg_num) {
            resolve(finished);
          }
        }
      })(i);
      for(let ii=0;ii< test_msg_num;ii++) {
        convs[i].send(new TextMessage('my name is test_' + i+',hi:'+ii)).then(func);
      }
    }
  });
};

var step_startTime = startTime;//起始时间
var step_startTimeFormat = getNowFormatDate();
var step = batchCreateClients(allnum).then((allnum)=>{
  var endTime =  new Date().getTime();//起始时间
  step_startTime = endTime;
  console.log(getNowFormatDate(),'finished batchCreateClients',' all num:'+allnum,'runtime:'+(endTime-startTime)+' ms ');
  return allnum;
}).catch(function(err){
  console.error(err);
});

if(test_msg_num>0) {
//批量查询
  step = step.then(()=>batchQueryConv(clients)).then((allnum)=> {
    var endTime = new Date().getTime();//起始时间
    console.log('finished batchQueryConv', ' all num:' + allnum, 'runtime:' + (endTime - step_startTime) + ' ms ');
    step_startTime = endTime;
  });


//批量加入对话
  /*
  step = step.then(()=>batchJoinConv(convs)).then(allnum=>{
    var endTime =  new Date().getTime();//起始时间
    console.log('finished batchJoinConv',' all num:'+allnum,'runtime:'+(endTime-step_startTime)+' ms ');
    step_startTime = endTime;
  }).catch(function(err){
    console.error(err);
  });
*/
  //批量发送
  step = step.then(()=>batchSendConv(convs)).then(allnum=>{
    var endTime =  new Date().getTime();//起始时间
    console.log('finished batchSendConv',' all num:'+allnum,'runtime:'+(endTime-step_startTime)+' ms ');
  });
}
else {
  //发送一个新的记录
  step = step.then(()=>{
    var client = new Realtime(cfg).createIMClient("chensf");
    return client;
  }).then((client)=>{
    client.getConversation(cid).then(conv=>{
      return conv.join()
    }).then(conv=>{
      function sendMsg(conv){
        step_startTime = new Date().getTime();//起始时间
        console.log(getNowFormatDate(),"start send:",(sendCount++));
        conv.send(new TextMessage("hello:"+sendCount)).then(()=>{
          //sendMsg(conv);
        });
      }
      sendMsg(conv);
    });
  });
}


