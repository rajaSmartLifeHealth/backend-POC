const express = require("express");
const Metric = require("../models/Metric");
const metricRoutes = express.Router();
const {Patient} = require("../models/Patient");

// Get all metrics
metricRoutes.get("/",  auth,async (req, res) => {
  try {
    const metrics = await Metric.find().populate("patient");
    res.json(metrics);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Add a new metric
metricRoutes.post("/", auth, async (req, res) => {
  const { name, value, patient } = req.body;

  try {

    if (!name || !value || !patient) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Find a single patient document by name
    const patientDoc = await Patient.findOne({ name: patient });
    if (!patientDoc) {
      return res.status(400).json({ error: "Patient not available" });
    }

    const newMetric = new Metric({
      name,
      value,
      patient: patientDoc._id, // Use the patient's ObjectId
    });

    await newMetric.save();
    res.status(201).json(newMetric);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// Update a metric
metricRoutes.put("/:id",  auth,async (req, res) => {
  const { name, value, patient } = req.body;

  try {
    const metric = await Metric.findByIdAndUpdate(
      req.params.id,
      { name, value, patient },
      { new: true }
    ).populate("patient");
    res.json(metric);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Delete a metric
metricRoutes.delete("/:id", auth, async (req, res) => {
  try {
    await Metric.findByIdAndDelete(req.params.id);
    res.json({ message: "Metric deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = metricRoutes;
