import SocketClient from './SocketClient';
import Room from './Room';

class ClientRoomBinding {

  /**
   * 取的client的所有房間
   * @param {string} clientId
   * @return {Array}
   */
  getClientOwnRooms(clientId) {
    const client = SocketClient.getClient(clientId);
    if (client) {
      if (client.ownRooms === undefined) {
        client.ownRooms = [];
        SocketClient.setClient(clientId, client);
      }
      return client.ownRooms;
    }

    return [];
  }

  /**
   * 新增一位使用者到room裡面
   * @param {string} roomId
   * @param {string} clientId
   * @return {boolean}
   */
  addClientIntoRoom(roomId, clientId) {
    if (Room.hasRoom(roomId)) {

      const client = SocketClient.getClient(clientId);
      if (client) {
        //noinspection JSUnresolvedVariable
        if (client.ownRooms === undefined) {
          client.ownRooms = [];
        }
        client.ownRooms.push(roomId);
        SocketClient.setClient(clientId, client);
        Room.addIntoRoom(roomId, clientId);
        return true;
      }

    }

    return false;
  }

  /**
   * 移除client在特定房間
   * @param {string} roomId
   * @param {string} clientId
   * @return {boolean}
   */
  removeClientFromRoom(roomId, clientId) {
    const room = Room.getRoom(roomId);
    if (!room) {
      return false;
    }

    const client = SocketClient.getClient(clientId);
    const clientRoomIndex = client.ownRooms.indexOf(roomId);
    if (clientRoomIndex == -1 || !client) {
      return false;
    }

    const roomClientIndex = room.indexOf(clientId);
    if (roomClientIndex == -1 || !room) {
      return false;
    }

    //刪除使用者與room之間的關係
    client.ownRooms.splice(clientRoomIndex);
    SocketClient.setClient(clientId, client);
    Room.setRoom(roomId, room.splice(roomClientIndex));
    return true;
  }

  /**
   * 移除client在全部房間
   * @param {string} clientId
   */
  removeClientFromAllRoom(clientId) {
    const roomIds = Room.getAllRoomIds();

    for (let index in roomIds) {
      const roomId = roomIds[index];
      const room = Room.getRoom(roomId);
      const roomClientIndex = room.indexOf(clientId);
      if (roomClientIndex != -1) {
        Room.setRoom(roomId, room.splice(roomClientIndex));
      }
    }

  }

  /**
   * 刪除client所有資料
   * @param {string} clientId
   */
  removeClientAndRelation(clientId) {
    this.removeClientFromAllRoom(clientId);
    console.log(SocketClient.removeClient(clientId));
  }

}

let ClientRoomBind = new ClientRoomBinding();
export {
    ClientRoomBind, SocketClient, Room
};

