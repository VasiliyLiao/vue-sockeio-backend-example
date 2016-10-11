import SocketClient from '../service/SocketClient';

/**
 *  ClientEmitAction
 */
class ClientEmitAction {

  /**
   * 判斷是不是物件型態
   * @param {Object} obj
   * @return {boolean}
   */
  isObject(obj) {
    return ((typeof obj === "object") && (obj !== null));
  }

  /**
   * 傳送聊天訊息給client
   * @param {string} clientId
   * @param {string} message
   * @param {Object} moreMessageObject
   */
  sendMessage(clientId, message, moreMessageObject = {}) {
    const client = SocketClient.getClient(clientId);

    if (client) {
      if (!this.isObject(moreMessageObject)) {
        moreMessageObject = {};
      }

      client.emit('chat', Object.assign({message: message}, moreMessageObject));
    }

  }

  /**
   * 傳送聊天事件給client
   * @param {string} clientId
   * @param {string} eventName
   * @param {string} eventMessage
   * @param {Object} moreEventObject
   */
  sendEvent(clientId, eventName, eventMessage, moreEventObject = {}) {
    const client = SocketClient.getClient(clientId);

    if (client) {
      if (!this.isObject(moreEventObject)) {
        moreEventObject = {};
      }

      const eventObject = {
        name: eventName,
        message: eventMessage
      };

      client.emit('event', Object.assign(eventObject, moreEventObject));
    }

  }

  /**
   * 傳送加入房間事件給client
   * @param {string} clientId
   * @param {string} roomId
   */
  sendJoinRoomEvent(clientId, roomId) {
    const message = 'you are join room roomId: ' + roomId;
    this.sendEvent(clientId, 'joinRoom', message, {roomId: roomId});
  }

  /**
   * 傳送離開房間事件給client
   * @param {string} clientId
   * @param {string} roomId
   */
  sendLeaveRoomEvent(clientId, roomId) {
    const message = 'you are leave room roomId: ' + roomId;
    this.sendEvent(clientId, 'leaveRoom', message, {roomId: roomId});
  }

  /**
   * 傳送踢除client事件給client
   * @param {string} clientId
   */
  sendPleaseKickMeEvent(clientId) {
    this.sendEvent(clientId, 'pleaseKickMe', 'you will be kicked by server.');
  }

  /**
   * 傳送取的所有使用者事件給client
   * @param {string} clientId
   */
  sendGetAllUserEvent(clientId) {
    const users = SocketClient.getAllId();
    this.sendEvent(
        clientId,
        'getAllUser',
        'getting all user list: ' + users.join(),
        {
          users: users
        });
  }

}

export default new ClientEmitAction;