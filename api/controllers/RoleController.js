const UserRole = require("../models/RoleModel");
module.exports.findAllRole = async (req, res, next) => {
  try {
    const [data] = await UserRole.findAllRole();
    res.send(data);
  } catch (err) {
    next(err);
  }
};
