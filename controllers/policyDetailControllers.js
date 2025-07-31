const dotenv = require("dotenv");

// POLICY DETAILS MODEL
const { PolicyDetail } = require("../models");

// CORE-CONFIG MODULES
const logger = require("../core-configuration/logger/log-config");
const { successResponse, errorResponse } = require("../utils/handleResponse");

// Load the appropriate .env file
dotenv.config();

const createPolicy = async (req, res) => {
  try {
    logger.info("policyDetailControllers --> createPolicy --> started");

    const {
      dob,
      gender,
      sumAssured,
      modalPremium,
      premiumFrequency,
      pt,
      ppt,
    } = req.body;

    // Basic input validation
    if (
      !dob ||
      !gender ||
      !sumAssured ||
      !modalPremium ||
      !premiumFrequency ||
      !pt ||
      !ppt
    ) {
      logger.warn(
        "policyDetailControllers --> createPolicy --> missing required fields"
      );
      return errorResponse(res, "All fields are required", null, 400);
    }

    // Create policy
    const policy = await PolicyDetail.create({
      dob,
      gender,
      sumAssured: parseFloat(sumAssured),
      modalPremium: parseFloat(modalPremium),
      premiumFrequency,
      pt: parseInt(pt),
      ppt: parseInt(ppt),
    });

    logger.info(
      "policyDetailControllers --> createPolicy --> policy created successfully"
    );

    return successResponse(res, "Policy created successfully", {
      policy: {
        id: policy.id,
        dob: policy.dob,
        gender: policy.gender,
        sumAssured: policy.sumAssured,
        modalPremium: policy.modalPremium,
        premiumFrequency: policy.premiumFrequency,
        pt: policy.pt,
        ppt: policy.ppt,
      },
    });
  } catch (error) {
    logger.error(`Error in createPolicy: ${error.message}`);
    return errorResponse(
      res,
      "An error occurred while creating the policy",
      null,
      500
    );
  }
};

const getAllPolicyDetails = async (req, res) => {
  try {
    logger.info("policyDetailControllers --> getAllPolicyDetails --> started");

    // Get all policies with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: policies } = await PolicyDetail.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]], 
      attributes: {
        exclude: ["updatedAt"], 
      },
    });

    logger.info(
      "policyDetailControllers --> getAllPolicyDetails --> policies fetched successfully"
    );

    return successResponse(res, "Policies fetched successfully", {
      policies,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    logger.error(`Error in getAllPolicyDetails: ${error.message}`);
    return errorResponse(
      res,
      "An error occurred while fetching policies",
      null,
      500
    );
  }
};

module.exports = { createPolicy, getAllPolicyDetails };
