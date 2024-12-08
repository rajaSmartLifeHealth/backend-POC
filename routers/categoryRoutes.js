const express = require("express");
const categoryRoutes = express.Router();
const { CategoryModel } = require("../models/category");

categoryRoutes.get("/", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new category
categoryRoutes.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const category = new CategoryModel({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = categoryRoutes;
