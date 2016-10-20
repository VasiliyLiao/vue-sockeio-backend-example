import Room from '../../repositories/Room';

class RoomEmitAction {

  /**
   * 送出房間訊息
   * @param {string} roomId
   * @param {string} message
   * @param {Object} object
   * @return {boolean}
   */
  sendMessage(roomId, message, object = {}) {

    if (Room.getRoom(roomId)) {
      _SocketIOServer.to(roomId).emit('chat', Object.assign({message: message}, object));
      console.log('the server send message to roomId: ' + roomId);
      return true;
    }

    return false;
  }

  /**
   * 當新的使用者加入新的房間
   * @param {string} roomId
   * @param {string} clientId
   */
  hasNewUserInRoom(roomId, clientId) {
    this.sendMessage(roomId, 'new User join room. clientId: ' + clientId);
  }

  /**
   * 當使用者離開房間
   * @param roomId
   * @param clientId
   */
  removeUserInRoom(roomId, clientId) {
    this.sendMessage(roomId, 'has User leave room. clientId: ' + clientId);
  }


}

export default new RoomEmitAction;