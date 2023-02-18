const express = require("express");
const ProductUnits = require("../controllers/ProductUnitControllers");
const router = express.Router();

router
  .route("/product-units")
  .post(ProductUnits.createNewUnit)
  .get(ProductUnits.findAllUnit);
router.delete("/product-units/:id", ProductUnits.deleteUnit);
router.put("/product-units/:id", ProductUnits.updateUnit);
router.get("/product-units/:id", ProductUnits.findOne);
module.exports = router;
