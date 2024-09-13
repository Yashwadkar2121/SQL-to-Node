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
// Edit a category
exports.editCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name, status, sequence } = req.body;
  const newImage = req.file ? req.file.path : null;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Prepare update data
    const updateData = {
      category_name,
      status,
      sequence,
    };

    // Update the image path if a new image is provided
    if (newImage) {
      // Optionally delete the old image if needed
      // fs.unlinkSync(path.join(__dirname, '../uploads', category.image));

      updateData.image = newImage;
    }

    // Update the category
    const updatedCategory = await category.update(updateData);

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error during category update:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete the category
    await category.destroy();

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error during category deletion:", error);
    res.status(500).json({ message: "Server error" });
  }
};
