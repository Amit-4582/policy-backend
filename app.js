require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// CORE CONFIG MODULES
const logger = require("./core-configuration/logger/log-config");
const sequelize = require("./core-configuration/sequelize/sequelize-config");

// DB MODELS MODULES
const db = require("./models");

// MIDDLEWARES MODULES
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const { verifyToken } = require("./middlewares/verifyToken");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const policyDetailRoutes = require("./routes/policyDetailRoutes");

const app = express();
const PORT = process.env.PORT || 5005;
const BASE_URL = process.env.BASE_URL || "/api/v1";

logger.info(`Running in ${process.env.NODE_ENV} environment`);

// Middleware Configuration
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// Health Check Endpoint
app.get("/", (req, res) => res.send("Hello, world!").end());

// Public Routes
app.use(`${BASE_URL}/auth`, authRoutes);

// Protected Routes
app.use(verifyToken);

// app.use(`${BASE_URL}/policy-detail`, policyDetailRoutes);

// Database Connection & Server Startup
db.sequelize
  .authenticate()
  .then(() => {
    logger.info("Database connection established successfully.");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => logger.info(`Server running on PORT ${PORT}`));
  })
  .catch((err) => {
    logger.error("Database connection failed:", err);
  });
