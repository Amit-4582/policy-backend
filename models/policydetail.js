"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class PolicyDetail extends Model {
    static associate(models) {}
  }

  PolicyDetail.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true,
          isDate: true,
          isValidAge(value) {
            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
            if (age < 23 || age > 56) {
              throw new Error("Age must be between 23 and 56 years");
            }
          },
        },
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [["Male", "Female", "Other"]],
        },
      },
      sumAssured: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
          isDecimal: true,
          min: 0,
          isValidSumAssured(value) {
            const modalPremium = this.modalPremium || 0;
            const minSumAssured = Math.max(modalPremium * 10, 5000000);
            if (value < minSumAssured) {
              throw new Error(`Sum Assured must be at least ${minSumAssured.toLocaleString()}`);
            }
          },
        },
      },
      modalPremium: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
          isDecimal: true,
          min: 10000,
          max: 50000,
        },
      },
      premiumFrequency: {
        type: DataTypes.ENUM("Yearly", "Half-Yearly", "Monthly"),
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [["Yearly", "Half-Yearly", "Monthly"]],
        },
      },
      pt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isInt: true,
          min: 10,
          max: 20,
          isGreaterThanPPT(value) {
            const ppt = this.ppt || 0;
            if (value <= ppt) {
              throw new Error("Policy Term must be greater than Premium Paying Term");
            }
          },
        },
      },
      ppt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isInt: true,
          min: 5,
          max: 10,
        },
      },
    },
    {
      sequelize,
      modelName: "PolicyDetail",
    }
  );

  return PolicyDetail;
};