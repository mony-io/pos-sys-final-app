const Supplier = require("../models/model.supplier");

exports.createNewSupplier = async (req, res, next) => {
  try {
    let supplier = new Supplier(
      req.body.supName,
      req.body.companyName,
      req.body.email,
      req.body.phone,
      req.body.address
    );
    supplier = await supplier.save();
  } catch (err) {
    next(err);
  }
};

exports.findAllSupplier = async (req, res, next) => {
  try {
    const [supplier] = await Supplier.findAll();
    res.send(supplier);
  } catch (err) {
    next(err);
  }
};

exports.deleteSupplier = async (req, res, next) => {
  try {
    const [result] = await Supplier.deleteById(req.params.id);
    if (result.affectedRows !== 0) {
      res.send({ message: "Supplier deleted." });
    } else {
      res.send({ message: "Delete failed." });
    }
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const [supplier] = await Supplier.findOne(req.params.id);
    res.send(supplier);
  } catch (err) {
    next(err);
  }
};

exports.updateSupplier = async (req, res, next) => {
  try {
    const [result] = await Supplier.updateById(
      req.body.supName,
      req.body.companyName,
      req.body.email,
      req.body.phone,
      req.body.address,
      req.params.id
    );

    if (result.affectedRows !== 0) {
      res.send({ message: "Supplier updated." });
    } else {
      res.send({ message: "Update failed." });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteSupplier = async (req, res, next) => {
  try {
    const [result] = await ProductUnits.deleteSupplier(req.params.id);
    if (result.affectedRows !== 0) {
      res.send({ message: "Supplier deleted." });
    } else {
      res.send({ message: "delete failed." });
    }
  } catch (err) {
    next(err);
  }
};
