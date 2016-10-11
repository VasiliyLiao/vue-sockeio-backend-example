/**
 * 全部的Console.log事件
 */
class ShowConsole {

  /**
   * 當新增新的房間時
   * @param {string} roomId
   */
  onAddNewRoom(roomId) {
    console.log('add new Room id:' + roomId);
  }

  /**
   * 當client連線時
   * @param {string} clientId
   */
  onConnect(clientId) {
    console.log('has client connect clientId: ' + clientId);
  }

  /**
   * 當client離線時
   * @param {string} clientId
   * @param {string} err
   */
  onDisconnect(clientId, err) {
    console.log('has client disconnect clientId: ' + clientId + ' error: ' + err);
  }

  /**
   * 當client加入任一房間時
   * @param {string} clientId
   * @param {string} roomId
   */
  onJoinRoom(clientId, roomId) {
    console.log('has client join room clientId: ' + clientId + ' roomId: ' + roomId);
  }

  /**
   * 當client離開任一房間時
   * @param {string} clientId
   * @param {string} roomId
   */
  onLeaveRoom(clientId, roomId) {
    console.log('has client leave room clientId: ' + clientId + ' roomId: ' + roomId);
  }

  /**
   * 當client想要server踢除他時
   * @param {string} clientId
   */
  onPleaseKickMe(clientId) {
    console.log('has client want to be kicked clientId: ' + clientId);
  }

  /**
   * 當想要取得所有client使用者時
   * @param clientId
   */
  onGetAllUser(clientId) {
    console.log('has client want getAllUser clientId: ' + clientId);
  }

  /**
   * 當想要取得所有房間時
   * @param clientId
   */
  onGetAllRoom(clientId) {
    console.log('has client want getAllRoom clientId: ' + clientId);
  }

}

export default new ShowConsole;