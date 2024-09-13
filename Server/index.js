require("dotenv").config();
const express = require("express");
const sequelize = require("./db/db");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
app.use(express.json());

// routes
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);

// Test DB connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync(); // Sync all models with the database
  })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
