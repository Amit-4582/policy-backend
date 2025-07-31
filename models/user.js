"use strict";

const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[A-Za-z\s]{2,}$/i,
          len: [2, 100], 
        },
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true,
          isDate: true,
          isBefore: new Date().toISOString().split("T")[0], 
          isOldEnough(value) {
            const minAgeDate = new Date();
            minAgeDate.setFullYear(minAgeDate.getFullYear() - 13);
            if (new Date(value) > minAgeDate) {
              throw new Error("You must be at least 13 years old");
            }
          },
        },
      },
      contactNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [8, 100],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};