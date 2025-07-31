const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// CORE-CONFIG
const logger = require("../core-configuration/logger/log-config");

// UTILS MODULES
const { errorResponse } = require("../utils/handleResponse");

// MIDDLEWARE
const { isBlacklisted } = require("./blackListToken");

// Load the appropriate .env file
dotenv.config();

const verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return errorResponse(res, "Authorization token is required", null, 401);
  }

  if (isBlacklisted(token)) {
    return errorResponse(res, "This token has been invalidated", null, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    req.emailId = decoded.emailId;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      logger.error("Token has expired ::: ", error);
      return errorResponse(res, "Your session has expired. Please log in again.", error, 401);
    } else if (error.name === "JsonWebTokenError") {
      logger.error("Invalid token ::: ", error);
      return errorResponse(res, "Invalid authentication token", error, 403);
    } else {
      logger.error("Error in verifying token ::: ", error);
      return errorResponse(res, "Failed to authenticate token", error, 403);
    }
  }
};

module.exports = { verifyToken };