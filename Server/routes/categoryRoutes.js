const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

// Add a new category (with image upload)
router.post("/", authenticate, upload.single("image"), addCategory);

// Get all categories for the logged-in user
router.get("/", authenticate, getAllCategories);

// Edit a category
router.put("/:id", authenticate, upload.single("image"), editCategory);

// Delete a category
router.delete("/:id", authenticate, deleteCategory);

module.exports = router;
