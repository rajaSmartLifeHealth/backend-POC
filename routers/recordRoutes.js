const express = require("express");
const Record = require("../models/Record");
const recordRoutes = express.Router();

// Get all records
recordRoutes.get("/", async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Add a new record
recordRoutes.post("/", async (req, res) => {
  const { name, category } = req.body;

  try {
    const newRecord = new Record({ name, category });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Update a record
recordRoutes.put("/:id", async (req, res) => {
  const { name, category } = req.body;

  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      { name, category },
      { new: true }
    );
    res.json(record);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Delete a record
recordRoutes.delete("/:id", async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = recordRoutes;
