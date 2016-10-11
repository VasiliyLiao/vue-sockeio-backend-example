import uuid from 'node-uuid';
/**
 * 全部的房間物件
 */
class Room {

  constructor() {
    this.rooms = {};
  }

  /**
   * 取的所有房間
   * @return {Array}
   */
  getAllRoomIds() {
    return Object.keys(this.rooms);
  }

  /**
   * 是否有此room
   * @param {string} id
   * @return {boolean}
   */
  hasRoom(id) {
    return this.rooms[id] !== undefined;
  }

  /**
   * 取得此間Room
   * @param {string} id
   * @return {Array}
   */
  getRoom(id) {
    return this.rooms[id];
  }

  /**
   * 新增一間房間
   * @return {string}
   */
  addRandomRoom() {
    const id = uuid.v4();
    this.rooms[id] = [];
    return id;
  }

  /**
   * 設定Room的內容
   * @param {string} id
   * @param {Array} data
   * @return {boolean}
   */
  setRoom(id, data = []) {
    if (this.getRoom(id)) {
      this.rooms[id] = data;
      return true;
    }
    return false;
  }

  /**
   * 新增資料進去room的陣列裡面
   * @param {string} id
   * @param {string} data
   * @return {boolean}   */
  addIntoRoom(id, data) {
    if (this.getRoom(id)) {
      this.rooms[id].push(data);
      return true;
    }
    return false;
  }

  /**
   * 移除房間
   * @param {string} id
   * @return {boolean}
   */
  removeRoom(id) {
    if (this.hasRoom(id)) {
      delete this.rooms[id];
      return true;
    }

    return false;
  }

}

export default new Room;