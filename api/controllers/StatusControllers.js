const Status = require("../models/ModelSatus");

exports.findAllStatus = async (req, res, next) => {
  try {
    const [status] = await Status.findAll();
    res.send(status);
  } catch (err) {
    next(err);
  }
};
