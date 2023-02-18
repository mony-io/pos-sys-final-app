const db = require("../config/db");
class Status {
  static findAll() {
    const sql = "SELECT *FROM tblStatus";
    return db.execute(sql);
  }
}

module.exports = Status;
