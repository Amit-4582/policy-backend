const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load the appropriate .env file
dotenv.config();

const generateAccessToken = (id, emailId) => {
  return jwt.sign({ id, emailId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (id, emailId) => {
  return jwt.sign({ id, emailId }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
