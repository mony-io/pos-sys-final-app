const db = require("../config/db");

class Product {
  constructor(
    category_id,
    brand_id,
    sub_id,
    unit_id,
    product_code,
    product_name,
    qty,
    unit_price,
    price,
    exp_date,
    product_image,
    desc,
    status,
    reorder_number
  ) {
    this.category_id = category_id;
    this.brand_id = brand_id;
    this.sub_id = sub_id;
    this.unit_id = unit_id;
    this.product_code = product_code;
    this.product_name = product_name;
    this.qty = qty;
    this.unit_price = unit_price;
    this.price = price;
    this.exp_date = exp_date;
    this.product_image = product_image;
    this.desc = desc;
    this.status = status;
    this.reorder_number = reorder_number;
  }

  save() {
    const sql =
      "INSERT INTO tblProducts(`category_id`,`brand_id`,`sub_id`,`unit_id`,`product_code`,`product_name`,qty,unit_price,price,exp_date,product_image,`desc`,`status`,reorder_number) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    return db.execute(sql, [
      this.category_id,
      this.brand_id,
      this.sub_id,
      this.unit_id,
      this.product_code,
      this.product_name,
      this.qty,
      this.unit_price,
      this.price,
      this.exp_date,
      this.product_image,
      this.desc,
      this.status,
      this.reorder_number,
    ]);
  }

  static updateProductById(
    category_id,
    brand_id,
    sub_id,
    product_code,
    product_name,
    qty,
    unit_price,
    price,
    exp_date,
    product_image,
    desc,
    status,
    reorder_number,
    product_id
  ) {
    const sql =
      "UPDATE tblProducts SET category_id=?,brand_id=?,sub_id=?,product_code=?,product_name=?,qty=?,unit_price=?,price=?,exp_date=?,product_image=?,`desc`=?,`status`=?,reorder_number=? WHERE product_id=?";
    return db.query(sql, [
      category_id,
      brand_id,
      sub_id,
      product_code,
      product_name,
      qty,
      unit_price,
      price,
      exp_date,
      product_image,
      desc,
      status,
      reorder_number,
      product_id,
    ]);
  }

  static findImageById(id) {
    const sql = "SELECT product_image FROM tblProducts WHERE product_id=?";
    return db.execute(sql, [id]);
  }

  static findProductByName(product_name) {
    const sql = "SELECT product_name FROM tblProducts WHERE product_name = ?";
    return db.execute(sql, [product_name]);
  }

  static findProductCode(product_code) {
    const sql = "SELECT product_code FROM tblProducts WHERE product_code = ?";
    return db.execute(sql, [product_code]);
  }

  static findAllProduct() {
    const sql = `SELECT product_code,product_name,tblBrands.brandName,tblCategories.categoryName,unit_price,
      price
      FROM tblProducts
      LEFT JOIN tblCategories 
      ON tblProducts.category_id = tblCategories.id
      LEFT JOIN tblBrands
      ON tblProducts.brand_id = tblBrands.id
      LEFT JOIN tblUnits 
      ON tblProducts.unit_id = tblUnuts.id 
    `;
    return db.execute(sql);
  }

  static findDuplicateByName(id, product_name) {
    const sql =
      "SELECT *FROM tblProducts WHERE NOT product_id=? AND product_name=?";
    return db.execute(sql, [id, product_name]);
  }

  static findDuplicateByProductCode(id, product_code) {
    const sql =
      "SELECT *FROM tblProducts WHERE NOT product_id=? AND product_code=?";
    return db.execute(sql, [id, product_code]);
  }

  static deleteById(id) {
    const sql = "DELETE FROM tblProducts WHERE product_id = ?";
    return db.execute(sql, [id]);
  }

  static deleteImageById(id) {
    const sql = "UPDATE tblProducts SET product_image='' WHERE product_id=?";
    return db.execute(sql, [id]);
  }

  static findProductById(id) {
    const sql = "SELECT *FROM tblProducts WHERE product_id=?";
    return db.execute(sql, [id]);
  }

  static productCard() {
    const sql =
      "SELECT product_id,product_name,price,product_image,qty FROM tblProducts WHERE `status` = 1";
    return db.execute(sql);
  }
}

module.exports = Product;
