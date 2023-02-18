const express = require("express");
const Supplier = require("../controllers/SupplierController");
const router = express.Router();

router
  .route("/supplier")
  .post(Supplier.createNewSupplier)
  .get(Supplier.findAllSupplier);
router.delete("/supplier/:id", Supplier.deleteSupplier);
router.put("/supplier/:id", Supplier.updateSupplier);
router.get("/supplier/:id", Supplier.findOne);
module.exports = router;
