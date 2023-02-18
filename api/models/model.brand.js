const db = require("../config/db");

class Brnad {
  constructor(brandName, desc) {
    this.brandName = brandName;
    this.desc = desc;
  }

  save() {
    const sql = "INSERT INTO tblBrands(`brandName`,`desc`) VALUES(?,?)";
    return db.execute(sql, [this.brandName, this.desc]);
  }

  static findAll() {
    const sql = "SELECT *FROM tblBrands";
    return db.execute(sql);
  }

  static updateById(brandName, desc, id) {
    const sql = "UPDATE tblBrands SET `brandName`=?,`desc`=? WHERE `id` = ?";
    return db.query(sql, [brandName, desc, id]);
  }

  static deleteById(id) {
    const sql = "DELETE FROM tblBrands WHERE id = ?";
    return db.execute(sql, [id]);
  }

  static findByName(brandName) {
    const sql = "SELECT *FROM tblBrands WHERE brandName=?";
    return db.execute(sql, [brandName]);
  }

  static updateDuplicate(id, brandName) {
    const sql = "SELECT *FROM tblBrands WHERE NOT id=? AND brandName=?";
    return db.execute(sql, [id, brandName]);
  }

  static findById(id) {
    const sql = "SELECT *FROM tblBrands WHERE id=?";
    return db.execute(sql, [id]);
  }
}

module.exports = Brnad;
