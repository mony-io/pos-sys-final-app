const db = require("../config/db");

class Supplier {
  constructor(supName, companyName, email, phone, address) {
    this.supName = supName;
    this.companyName = companyName;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }

  save() {
    const sql =
      "INSERT INTO tblSupplies(`supName`,`companyName`,`email`,`phone`,`address`) VALUES(?,?,?,?,?)";
    return db.execute(sql, [
      this.supName,
      this.companyName,
      this.email,
      this.phone,
      this.address,
    ]);
  }

  static findAll() {
    const sql = "SELECT *FROM tblSupplies";
    return db.execute(sql);
  }

  static updateById(supName, companyName, email, phone, address, id) {
    const sql =
      "UPDATE tblSuppliers SET `supName`=?,`companyName`=?,`email`=?,`phone`=?,`address`=? WHERE `id` = ?";
    return db.query(sql, [supName, companyName, email, phone, address, id]);
  }

  static deleteById(id) {
    const sql = "DELETE FROM tblSuppliers WHERE id = ?";
    return db.execute(sql, [id]);
  }

  static findByName(supName) {
    const sql = "SELECT *FROM tblSupplers WHERE supName=?";
    return db.execute(sql, [supName]);
  }

  static updateDuplicate(id, supName) {
    const sql = "SELECT *FROM tblSuppliers WHERE NOT id=? AND supName=?";
    return db.execute(sql, [id, supName]);
  }

  static findById(id) {
    const sql = "SELECT *FROM tblSuppliers WHERE id=?";
    return db.execute(sql, [id]);
  }
}

module.exports = Supplier;
