const express = require("express");
const StatusController = require("../controllers/StatusControllers");

const router = express.Router();

router.get("/status", StatusController.findAllStatus);

module.exports = router;
