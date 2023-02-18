const express = require("express");
const category = require("../controllers/CategoryControllers");
const verifyToken = require("../middlewares/VerifyToken");
const router = express.Router();

router
  .route("/categories")
  .get(category.findAllCategories)
  .post(category.createNewCategory);

router.put("/categories/:id", category.updateCategory);
router.delete("/categories/:id", category.deleteCategory);
router.get("/categories/:id", category.findOneById);
module.exports = router;
