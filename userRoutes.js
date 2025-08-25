const express = require("express");
const router = express.Router();
const userController = require("./userController");
const validator = require("./validator");

// Routes
router.post("/register", validator.validateRegister, userController.register);
router.post("/login", validator.validateLogin, userController.login);
router.get("/profile", userController.getProfile);

module.exports = router;
