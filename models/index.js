const Sequelize = require("sequelize");
const sequelize = require("../core-configuration/sequelize/sequelize-config");

const User = require("./user")(sequelize);
const PolicyDetail = require("./policydetails")(sequelize);

const db = {
  User,
  PolicyDetail,
  sequelize,
  Sequelize,
};

// Define Associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
