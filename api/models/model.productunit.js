const db = require("../config/db");

class ProductUnits {
  constructor(unit) {
    this.unit = unit;
  }

  save() {
    const sql = "INSERT INTO tblProductUnits(`unit`) VALUES(?)";
    return db.execute(sql, [this.unit]);
  }

  static findAll() {
    const sql = "SELECT *FROM tblProductUnits";
    return db.execute(sql);
  }

  static findById(id) {
    const sql = "SELECT *FROM tblProductUnits WHERE id = ?";
    return db.execute(sql, [id]);
  }

  static findByUnit(unit) {
    const sql = "SELECT *FROM tblProductUnits WHERE unit = ?";
    return db.execute(sql, [unit]);
  }

  static duplicateUnit(unit, id) {
    const sql = "SELECT *FROM tblProductUnits WHERE NOT id=? AND unit=?";
    return db.execute(sql, [id, unit]);
  }

  static updateById(unit, id) {
    const sql = "UPDATE tblProductUnits SET `unit`=? WHERE id = ?";
    return db.query(sql, [unit, id]);
  }

  static deleteById(id) {
    const sql = "DELETE FROM tblProductUnits WHERE id = ?";
    return db.query(sql, [id]);
  }
}

module.exports = ProductUnits;
