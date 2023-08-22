const express = require("express");

const healthCtrl = require("../controllers/health");

const router = express.Router();

router.route("/").get(healthCtrl.getHealth);

module.exports = router;
