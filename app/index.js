'use strict';
import Server from 'socket.io';
import ShowConsole from './service/ShowConsole';
import {ClientAction, RoomAction} from './websocket/EmitActionBinding'
import {ClientRoomBind, SocketClient, Room} from './service/ClientRoomBinding';

let io = Server(8000);
global._SocketIOServer = io;

ShowConsole.onAddNewRoom(Room.addRandomRoom());

io.on('connection', (socket)=> {
  const id = socket.id;
  ShowConsole.onConnect(id);
  SocketClient.addClient(id, socket);

  socket.on('disconnect', (err)=> {
    ShowConsole.onDisconnect(id, err);
    /*送出client離開聊天室*/
    const clientOwnRooms = ClientRoomBind.getClientOwnRooms(id);
    for (let index in clientOwnRooms) {
      RoomAction.removeUserInRoom(clientOwnRooms[index], id);
    }
    /* repository*/
    ClientRoomBind.removeClientAndRelation(id);
  });

  socket.on('joinRoom', (roomId)=> {
    ShowConsole.onJoinRoom(id, roomId);
    //新增監聽房間
    socket.join(roomId, ()=> {
      /* repository */
      ClientRoomBind.addClientIntoRoom(roomId, id);
      /* emitAction */
      ClientAction.sendJoinRoomEvent(id, roomId);
      RoomAction.hasNewUserInRoom(roomId, id);
    });
  });

  socket.on('leaveRoom', (roomId)=> {
    ShowConsole.onLeaveRoom(id, roomId);
    //新增離開房間
    socket.leave(roomId, ()=> {
      /* repository */
      ClientRoomBind.removeClientFromRoom(roomId, id);
      /* emitAction */
      RoomAction.removeUserInRoom(roomId, id);
      ClientAction.sendLeaveRoomEvent(id, roomId);
    });
  });

  socket.on('pleaseKickMe', ()=> {
    ShowConsole.onPleaseKickMe(id);
    /* emitAction */
    ClientAction.sendPleaseKickMeEvent(id);
    socket.disconnect();
  });

  socket.on('getAllUser', ()=> {
    ShowConsole.onGetAllUser(id);
    /* emitAction */
    ClientAction.sendGetAllUserEvent(id);
  });

  socket.on('getAllRoom', ()=> {
    ShowConsole.onGetAllRoom(id);
    const rooms = Room.getAllRoomIds();
    const message = 'getting all room list: ' + rooms.join();
    /* emitAction */
    ClientAction.sendEvent(id, 'getAllRoom', message, {rooms: rooms});
  });

  socket.on('chat', (message)=> {
    const chatMessage = id + ' say: ' + message.message + ' room in ' + message.to;
    const roomId = message.to;
    if (roomId) {
      RoomAction.sendMessage(roomId, chatMessage);
    } else {
      const clientOwnRooms = ClientRoomBind.getClientOwnRooms(id);
      for (let index in clientOwnRooms) {
        RoomAction.sendMessage(clientOwnRooms[index], chatMessage);
      }
    }
  });

});