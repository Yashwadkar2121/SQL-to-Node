// models/category.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./User"); // Assuming User model is in the same directory 

const Category = sequelize.define(
  "Category",
  {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "categories",
  }
);

module.exports = Category;
