"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "PolicyDetails",
      [
        {
          id: uuidv4(),
          dob: "1990-05-15",
          gender: "Male",
          sumAssured: 5000000.0,
          modalPremium: 500000.0,
          premiumFrequency: "Yearly",
          pt: 15,
          ppt: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          dob: "1985-08-22",
          gender: "Female",
          sumAssured: 7500000.0,
          modalPremium: 300000.0,
          premiumFrequency: "Half-Yearly",
          pt: 20,
          ppt: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          dob: "1995-03-10",
          gender: "Other",
          sumAssured: 5000000.0,
          modalPremium: 100000.0,
          premiumFrequency: "Monthly",
          pt: 12,
          ppt: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          dob: "1970-11-05",
          gender: "Female",
          sumAssured: 6000000.0,
          modalPremium: 200000.0,
          premiumFrequency: "Yearly",
          pt: 18,
          ppt: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          dob: "2000-06-30",
          gender: "Male",
          sumAssured: 8000000.0,
          modalPremium: 400000.0,
          premiumFrequency: "Monthly",
          pt: 14,
          ppt: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PolicyDetails", null, {});
  },
};
