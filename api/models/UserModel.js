const db = require("../config/db");

class Users {
  constructor(username, password, email, phone_number, role_id) {
    (this.username = username),
      (this.password = password),
      (this.email = email),
      (this.phone_number = phone_number);
    this.role_id = role_id;
  }

  save() {
    const sql =
      "INSERT INTO tblUsers(role_id,username,password,email,phone_number) VALUES(?,?,?,?,?)";
    return db.execute(sql, [
      this.role_id,
      this.username,
      this.password,
      this.email,
      this.phone_number,
    ]);
  }

  static findAll() {
    const sql = `SELECT id,username,email,phone_number,tblRoles.role_name FROM tblUsers 
      INNER JOIN tblRoles ON tblUsers.role_id = tblRoles.role_id
    `;
    return db.execute(sql);
  }

  static findByUsername(username) {
    const sql = `SELECT id,username,email,tblRoles.role_name,password FROM tblUsers 
    INNER JOIN tblRoles ON tblUsers.role_id = tblRoles.role_id WHERE username = ?`;
    return db.execute(sql, [username]);
  }

  static findByEmail(email) {
    const sql = `SELECT id,username,email,tblRoles.role_name,password FROM tblUsers 
    INNER JOIN tblRoles ON tblUsers.role_id = tblRoles.role_id WHERE email = ?`;
    return db.execute(sql, [email]);
  }

  static updateRefreshToken(id, refreshToken) {
    const sql = "UPDATE tblUsers SET token = ? WHERE id = ?";
    return db.query(sql, [refreshToken, id]);
  }

  static findByRefreshToken(refresh_token) {
    const sql = `SELECT username,email,id,tblRoles.role_name FROM tblUsers 
    INNER JOIN tblRoles ON tblUsers.role_id = tblRoles.role_id
    WHERE token = ?`;
    return db.execute(sql, [refresh_token]);
  }

  static findByTokenAndId(token, id) {
    const sql = "SELECT *FROM tblUsers WHERE token = ? AND id=?";
    return db.execute(sql, [token, id]);
  }

  static updatePassword(password, id) {
    const sql = "UPDATE tblUsers SET password = ? WHERE id=?";
    return db.query(sql, [password, id]);
  }

  static findById(id) {
    const sql = `SELECT id,username,email,tblRoles.role_name,tblUsers.role_id,phone_number,password FROM tblUsers 
    INNER JOIN tblRoles ON tblUsers.role_id = tblRoles.role_id WHERE id = ?`;
    return db.execute(sql, [id]);
  }

  static deleteById(id) {
    const sql = "DELETE FROM tblUsers WHERE id = ?";
    return db.execute(sql, [id]);
  }

  static updateOne(username, email, phone_number, role_id, id) {
    const sql =
      "UPDATE tblUsers SET username=?,email=?,phone_number=?,role_id=? WHERE id = ?";
    return db.query(sql, [username, email, phone_number, role_id, id]);
  }
}

module.exports = Users;
