const express = require("express");

// CONTROLLERS
const { createPolicy, getAllPolicyDetails } = require("../controllers/policyDetailControllers");

const router = express.Router();

router.post("/create-policy", createPolicy);
router.get("/get-all-policies", getAllPolicyDetails);

module.exports = router;