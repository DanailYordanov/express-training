const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/change-password").post(authController.changePassword);

module.exports = router;