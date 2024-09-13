const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Category = require("./category");
const User = require("./User");

const SubCategory = sequelize.define(
  "SubCategory",
  {
    sub_category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    image: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    sequence: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
    tableName: "sub_categories",
  }
);

module.exports = SubCategory;
