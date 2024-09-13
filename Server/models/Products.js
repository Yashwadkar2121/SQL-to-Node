const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Category = require("./category");
const SubCategory = require("./subCategory");
const User = require("./User");

const Product = sequelize.define(
  "Product",
  {
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: SubCategory,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
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
    tableName: "products",
  }
);

module.exports = Product;
