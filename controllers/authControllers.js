const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

// USER MODEL
const { User } = require("../models");

// CORE-CONFIG MODULES
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../core-configuration/jwt/generate-token");
const logger = require("../core-configuration/logger/log-config");
const { successResponse, errorResponse } = require("../utils/handleResponse");

// Determine the environment (default to 'development')
const environment = process.env.NODE_ENV || "development";

// Load the appropriate .env file
dotenv.config({ path: `.env.${environment}` });

// FUNCTION TO SIGNUP FOR ADMIN
const signUpUser = async (req, res) => {
  try {
    logger.info("authControllers --> signUpUser --> started");

    const { emailId, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ where: { emailId } });

    if (user) {
      // Verify password for existing user
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        logger.warn("authControllers --> signUpUser --> invalid password");
        return errorResponse(res, "Invalid password", null, 401);
      }

      const accessToken = generateAccessToken(user.id, user.emailId);
      const refreshToken = generateRefreshToken(user.id, user.emailId);

      logger.info("authControllers --> signUpUser --> existing user logged in");

      return successResponse(res, "Login successful", {
        user: {
          id: user.id,
          emailId: user.emailId,
        },
        accessToken,
        refreshToken,
      });
    }

    // User does not exist, create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      emailId,
      password: hashedPassword,
      avatarId: null,
    });

    const accessToken = generateAccessToken(user.id, user.emailId);
    const refreshToken = generateRefreshToken(user.id, user.emailId);

    logger.info("authControllers --> signUpUser --> new user created");

    return successResponse(res, "User created successfully", {
      user: {
        id: user.id,
        emailId: user.emailId,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error(`Error in signUpUser: ${error.message}`);
    return errorResponse(
      res,
      "An error occurred during authentication",
      null,
      500
    );
  }
};

module.exports = { signUpUser };
