const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    //console.log(file.originalname.split("."));
    cb(
      null,
      Date.now() +
        file.originalname.split(".")[0] +
        path.extname(file.originalname).toLowerCase()
    );
  },
});

const fileFilter = (req, file, cb) => {
  // Set the filetypes, it is optional
  let filetypes = /jpeg|jpg|png/;
  let mimetype = filetypes.test(file.mimetype);

  let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }

  cb({
    error:
      "File upload only supports the " + "following filetypes - " + filetypes,
  });
};

// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 5 * 1000 * 1000;

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
}).single("product_image");

module.exports = async (req, res, next) => {
  // Error MiddleWare for multer file upload, so if any
  // error occurs, the image would not be uploaded!
  upload(req, res, function (err) {
    if (err) {
      // ERROR occurred (here it can be occurred due
      // to uploading image of size greater than
      // 1MB or uploading different file type)
      res.send(err);
    } else {
      // SUCCESS, image successfully uploaded
      next();
    }
  });
};
