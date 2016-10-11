import SocketIo from 'socket.io-client';

console.log('--------------------Connect--------------------');
const socketIp = 'http://127.0.0.1:8000';
console.log('will connect to ' + socketIp);
let SocketClient = SocketIo.connect(socketIp, {rejectUnauthorized: false});
let myRooms = [];

SocketClient.on('connect', () => {
  console.log('socket was connect!!');
  SocketClient.emit('getAllUser');
  SocketClient.emit('getAllRoom');
});

SocketClient.on('chat', (chat) => {
  console.log(chat.message);
});

SocketClient.on('event', (event)=> {
  const message = {
    message: 'hello everyone.',
    to: event.roomId
  };

  if (event.name == 'getAllUser') {
    console.log('--------------------Get All User--------------------');
  }
  if (event.name == 'getAllRoom') {
    console.log('--------------------Get All Room--------------------');
    SocketClient.emit('joinRoom', event.rooms[0]);
  }
  if (event.name == 'joinRoom') {
    console.log('--------------------Join Room--------------------');
    myRooms.push(event.roomId);
    console.log('my rooms: ' + myRooms.toString());
    SocketClient.emit('chat', message);
    SocketClient.emit('leaveRoom', myRooms[0]);
  }
  if (event.name == 'leaveRoom') {
    console.log('--------------------Leave Room--------------------');
    SocketClient.emit('pleaseKickMe');
  }
  if (event.name == 'pleaseKickMe') {
    console.log('--------------------Please Kick Me--------------------');
  }
  console.log('receive a event name: ' + event.name + ' message: ' + event.message);
  if (event.name == 'joinRoom') {
    console.log('--------------------Send Chat--------------------');
    console.log(message.message);
    console.log('--------------------Receive Chat--------------------');
  }
});

SocketClient.on('disconnect', (err) => {
  console.log('--------------------Disconnect--------------------');
  console.log("socket was disconnect!!");
});

SocketClient.on('error', (err) => {
  console.log('--------------------Error--------------------');
  console.log(err);
});