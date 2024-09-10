const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development"; // Default to development if NODE_ENV is not set
const config = require("../config/config.json")[env];

const DB = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

module.exports = DB;
