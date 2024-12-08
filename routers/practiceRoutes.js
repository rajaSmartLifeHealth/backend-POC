const express = require("express");
const Practice = require("../models/Practice");
const practiceRoutes = express.Router();

// Get all practices
practiceRoutes.get("/",  auth,async (req, res) => {
  try {
    const practices = await Practice.find();
    res.json(practices);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Add a new practice
practiceRoutes.post("/",  auth,async (req, res) => {
  const { name, category } = req.body;

  try {
    const newPractice = new Practice({ name, category });
    await newPractice.save();
    res.status(201).json(newPractice);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Update a practice
practiceRoutes.put("/:id",  auth,async (req, res) => {
  const { name, category } = req.body;

  try {
    const practice = await Practice.findByIdAndUpdate(
      req.params.id,
      { name, category },
      { new: true }
    );
    res.json(practice);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Delete a practice
practiceRoutes.delete("/:id", auth, async (req, res) => {
  try {
    await Practice.findByIdAndDelete(req.params.id);
    res.json({ message: "Practice deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = practiceRoutes;
