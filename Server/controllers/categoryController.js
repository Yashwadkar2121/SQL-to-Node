const Category = require("../models/category");
const path = require("path");

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const { category_name, status, sequence } = req.body;
    const user_id = req.user.id; // Ensure req.user is populated by the middleware
    const image = req.file ? req.file.path : null;

    const category = await Category.create({
      category_name,
      image,
      status,
      sequence,
      user_id,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories for the logged-in user
exports.getAllCategories = async (req, res) => {
  try {
    const user_id = req.user.id; // Assuming user ID is available in req.user

    const categories = await Category.findAll({
      where: { user_id },
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
