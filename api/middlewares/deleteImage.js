const fs = require("fs");

const deleteImg = async (path) => {
  try {
    fs.unlinkSync(path);
  } catch (error) {}
};

module.exports = deleteImg;
