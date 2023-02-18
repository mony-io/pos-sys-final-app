const db = require("../config/db");

class UserRole {
  static findAllRole() {
    const sql = "SELECT *FROM tblRoles";
    return db.execute(sql);
  }
}

module.exports = UserRole;
