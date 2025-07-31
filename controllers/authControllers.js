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

// Load the appropriate .env file
dotenv.config();

// FUNCTION TO LOGIN
const loginUser = async (req, res) => {
  try {
    logger.info("authControllers --> loginUser --> started");

    const { emailId, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ where: { emailId } });

    if (user) {
      // Verify password for existing user
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        logger.warn("authControllers --> loginUser --> invalid password");
        return errorResponse(res, "Invalid password", null, 401);
      }

      const accessToken = generateAccessToken(user.id, user.emailId);
      const refreshToken = generateRefreshToken(user.id, user.emailId);

      logger.info("authControllers --> loginUser --> existing user logged in");

      return successResponse(res, "Login successful", {
        user: {
          id: user.id,
          emailId: user.emailId,
          name: user.name,
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

    logger.info("authControllers --> loginUser --> new user created");

    return successResponse(res, "User created successfully", {
      user: {
        id: user.id,
        emailId: user.emailId,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error(`Error in loginUser: ${error.message}`);
    return errorResponse(
      res,
      "An error occurred during authentication",
      null,
      500
    );
  }
};

// FUNCTION TO REGISTER
const registerUser = async (req, res) => {
  try {
    logger.info("authControllers --> registerUser --> started");

    const { name, dob, contactNo, emailId, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { emailId } });
    if (existingUser) {
      logger.warn("authControllers --> registerUser --> user already exists");
      return errorResponse(
        res,
        "User with this email already exists",
        null,
        400
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      dob,
      contactNo,
      emailId,
      password: hashedPassword,
    });

    logger.info("authControllers --> registerUser --> new user created");

    return successResponse(res, "User registered successfully", {
      user: {
        id: user.id,
        name: user.name,
        emailId: user.emailId,
      },
    });
  } catch (error) {
    logger.error(`Error in registerUser: ${error.message}`);
    return errorResponse(
      res,
      "An error occurred during registration",
      null,
      500
    );
  }
};

module.exports = { loginUser, registerUser };
