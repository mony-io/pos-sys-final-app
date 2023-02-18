const db = require("../config/db");

class Category {
  constructor(categoryName, desc, photo) {
    this.categoryName = categoryName;
    this.desc = desc;
  }

  save() {
    const sql = "INSERT INTO tblCategories(`categoryName`,`desc`) VALUES(?,?)";
    return db.execute(sql, [this.categoryName, this.desc]);
  }

  static updateById(categoryName, desc, id) {
    const sql =
      "UPDATE tblCategories SET `categoryName`=?,`desc`=? WHERE `id` = ?";
    return db.query(sql, [categoryName, desc, id]);
  }

  static deleteById(id) {
    const sql = "DELETE FROM tblCategories WHERE id = ?";
    return db.execute(sql, [id]);
  }

  static findAll() {
    const sql = "SELECT *FROM tblCategories";
    return db.execute(sql);
  }

  static findById(id) {
    const sql = "SELECT *FROM tblCategories WHERE id=?";
    return db.execute(sql, [id]);
  }

  static findByName(catName) {
    const sql = "SELECT *FROM tblCategories WHERE categoryName=?";
    return db.execute(sql, [catName]);
  }

  static updateDuplicate(id, catName) {
    const sql = "SELECT *FROM tblCategories WHERE NOT id=? AND categoryName=?";
    return db.execute(sql, [id, catName]);
  }
}

module.exports = Category;
