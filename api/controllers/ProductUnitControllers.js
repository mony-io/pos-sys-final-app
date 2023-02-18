const ProductUnits = require("../models/model.productunit");

exports.createNewUnit = async (req, res, next) => {
  try {
    if (req.body.unit === "") {
      return res.send({
        message: "Please! Enter product unit.",
        success: false,
      });
    }

    // check if unit already existing
    const [result] = await ProductUnits.findByUnit(req.body.unit);

    if (result.length !== 0) {
      return res.send({ message: "Unit already exist.", success: false });
    }

    let productUnit = new ProductUnits(req.body.unit);
    productUnit = await productUnit.save();
    res
      .status(201)
      .send({ message: "Unit created successfully.", success: true });
  } catch (err) {
    next(err);
  }
};

exports.findAllUnit = async (req, res, next) => {
  try {
    const [units] = await ProductUnits.findAll();
    res.send(units);
  } catch (err) {
    next(err);
  }
};

exports.updateUnit = async (req, res, next) => {
  try {
    if (req.body.unit === "") {
      return res.send({ message: "Please! Enter product unit." });
    }

    // check update duplicate
    const [unit] = await ProductUnits.duplicateUnit(
      req.body.unit,
      req.params.id
    );
    //console.log(unit);
    if (unit.length !== 0) {
      return res.send({ message: "Unit already exit.", success: false });
    }

    const [result] = await ProductUnits.updateById(
      req.body.unit,
      req.params.id
    );

    if (result.affectedRows !== 0) {
      res.send({ message: "Unit updated.", success: true });
    } else {
      res.send({ message: "Update failed.", success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteUnit = async (req, res, next) => {
  try {
    const [result] = await ProductUnits.deleteById(req.params.id);
    if (result.affectedRows !== 0) {
      res.send({ message: "Unit deleted.", success: true });
    } else {
      res.send({ message: "delete failed.", success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const [unit] = await ProductUnits.findById(req.params.id);
    res.send(unit);
  } catch (err) {
    next(err);
  }
};
