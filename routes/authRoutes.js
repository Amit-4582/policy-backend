const express = require("express");

// CONTROLLERS
const { registerUser, loginUser } = require("../controllers/authControllers");

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);

module.exports = router;
