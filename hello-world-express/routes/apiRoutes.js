const express = require("express");
const apiController = require("../controllers/apiController");
const router = express.Router();

router.route("/get-last-price").get(apiController.getLastPrice);
router.route("/update-price").post(apiController.updatePrice);

module.exports = router;