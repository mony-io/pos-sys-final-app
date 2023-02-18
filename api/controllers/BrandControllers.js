const Brand = require("../models/model.brand");

exports.createNewBrand = async (req, res, next) => {
  try {
    if (!req.body.brandName) {
      return res.send({ message: "Please! Input brand name.", success: false });
    }

    // check duplicate
    const [brandName, _] = await Brand.findByName(req.body.brandName);
    if (brandName.length !== 0) {
      return res.send({
        message: "This brand-name already exist. Please! Try another once.",
        success: false,
      });
    }

    // create new brand
    let brand = new Brand(req.body.brandName, req.body.desc);
    brand = await brand.save();

    res.status(201).json({ message: "Brand created", success: true });
  } catch (err) {
    next(err);
  }
};

exports.findAllBrands = async (req, res, next) => {
  try {
    const [brands, _] = await Brand.findAll();
    res.send(brands);
  } catch (err) {
    next(err);
  }
};

exports.deleteBrandById = async (req, res, next) => {
  try {
    const [brand] = await Brand.deleteById(req.params.id);

    if (brand.affectedRows !== 0) {
      return res.send({
        message: "Brand name has been deleted.",
        success: true,
      });
    } else {
      res.send({ message: "Delete failed.", success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    // check if update duplicate brand name
    const [brand] = await Brand.updateDuplicate(
      req.params.id,
      req.body.brandName
    );

    if (brand.length !== 0) {
      return res.send({ message: "Brand already exist." });
    }

    const [result] = await Brand.updateById(
      req.body.brandName,
      req.body.desc,
      req.params.id
    );

    if (result.affectedRows !== 0) {
      res
        .status(201)
        .send({ message: "Brand has been updated.", success: true });
    } else {
      res.send({ message: "Brand update failed.", success: false });
    }
  } catch (error) {
    next(error);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const [brand, _] = await Brand.findById(req.params.id);
    res.send(brand);
  } catch (err) {
    next(err);
  }
};
