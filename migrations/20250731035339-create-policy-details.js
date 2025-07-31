'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PolicyDetails', {
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
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: false,
      },
      sumAssured: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      modalPremium: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      premiumFrequency: {
        type: Sequelize.ENUM("monthly", "quarterly", "semi-yearly", "yearly"),
        allowNull: false,
      },
      pt: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ppt: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('PolicyDetails');
  }
};