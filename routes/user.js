const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { generateToken, auth } = require("../middlewares/auth");

router.post("/register", generateToken, userController.register);
router.post("/login", auth, userController.login);

module.exports = router;
