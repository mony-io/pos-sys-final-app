const express = require("express");
const Brand = require("../controllers/BrandControllers");
const router = express.Router();

router.route("/brands").get(Brand.findAllBrands).post(Brand.createNewBrand);
router.delete("/brands/:id", Brand.deleteBrandById);
router.put("/brands/:id", Brand.updateBrand);
router.get("/brands/:id", Brand.findOne);
module.exports = router;
