const express = require("express");

// CONTROLLERS
const { signUpUser } = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup-user", signUpUser);

module.exports = router;
