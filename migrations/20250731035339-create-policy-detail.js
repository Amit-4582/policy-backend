"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PolicyDetails", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },
      sumAssured: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          min: 5000000, // Minimum enforced at model level with dynamic check
        },
      },
      modalPremium: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          min: 10000,
          max: 50000,
        },
      },
      premiumFrequency: {
        type: Sequelize.ENUM("Yearly", "Half-Yearly", "Monthly"),
        allowNull: false,
      },
      pt: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 10,
          max: 20,
        },
      },
      ppt: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 5,
          max: 10,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PolicyDetails");
  },
};
