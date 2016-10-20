/**
 * 全部的SocketClient物件
 */
class SocketClient {

  constructor() {
    this.clients = {};
  }

  /**
   * 是否有此client
   * @param {string} id
   * @return {boolean}
   */
  hasClient(id) {
    return this.clients[id] !== undefined;
  }

  /**
   * 設定client資料
   * @param {string} id
   * @param {Object} client
   * @return {boolean}
   */
  setClient(id, client) {
    if (!this.hasClient(id)) {
      this.clients[id] = client;
      return true;
    }
    return false;
  }

  /**
   * 新增client
   * @param {string} id
   * @param {Object} client
   * @return {boolean}
   */
  addClient(id, client) {
    if (!this.hasClient(id)) {
      this.clients[id] = client;
      return true;
    }
    return false;
  }

  /**
   * 刪除client
   * @param {string} id
   * @return {boolean}
   */
  removeClient(id) {
    if (this.hasClient(id)) {
      delete this.clients[id];
      return true;
    }
    return false;
  }

  /**
   * 取得client
   * @param {string} id
   * @return {Object}
   */
  getClient(id) {
    return this.clients[id];
  }

  /**
   * 取得所有clients ids
   * @return {Array}
   */
  getAllId() {
    return Object.keys(this.clients);
  }

}

export default new SocketClient;