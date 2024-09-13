const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
} = require("../controllers/categoryController");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

// Add a new category (with image upload)
router.post("/", authenticate, upload.single("image"), addCategory);

// Get all categories for the logged-in user
router.get("/", authenticate, getAllCategories);

module.exports = router;
