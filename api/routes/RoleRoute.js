const express = require("express");
const router = express.Router();
const UserRole = require("../controllers/RoleController");

router.get("/api/roles", UserRole.findAllRole);

module.exports = router;
