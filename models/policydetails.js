"use strict";

const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class PolicyDetails extends Model {
    static associate(models) {}
  }
  PolicyDetails.init(
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
        },
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      sumAssured: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
          isDecimal: true,
          min: 0,
        },
      },
      modalPremium: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
          isDecimal: true,
          min: 0,
        },
      },
      premiumFrequency: {
        type: DataTypes.ENUM("monthly", "quarterly", "semi-yearly", "yearly"),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      pt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isInt: true,
          min: 1,
        },
      },
      ppt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isInt: true,
          min: 1,
        },
      },
    },
    {
      sequelize,
      modelName: "PolicyDetails",
    }
  );
  return PolicyDetails;
};
