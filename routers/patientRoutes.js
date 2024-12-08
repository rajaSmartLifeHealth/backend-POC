const mongoose = require("mongoose");
const Practice = require("../models/Practice");
const express = require('express');
const Record = require("../models/Record");
const {PatientModel} = require("../models/Patient");
const auth = require("../middleware/authMiddleware");
const patientRoutes = express.Router();

// Get all patients
patientRoutes.get("/", auth, async (req, res) => {
  try {
    const patients = await PatientModel.find().populate("practice records");
    res.json(patients);
  } catch (err) {
    res.status(500).send("Server Error");
    console.error(err);
  }
});

// Add a new patient
patientRoutes.post("/", auth, async (req, res) => {
  try {
    const { name, practice, records } = req.body;

    const practiceDoc = await Practice.findOne({ name: practice });
    if (!practiceDoc) {
      return res.status(400).json({ error: "Invalid practice name" });
    }

    // Map record names to their respective ObjectIds
    const recordDocs = await Record.find({ name: { $in: records } });
    if (recordDocs.length !== records.length) {
      return res.status(400).json({ error: "One or more records are invalid" });
    }

    const recordIds = recordDocs.map((record) => record._id);

    // Create the patient
    const newPatient = new PatientModel({
      name,
      practice: practiceDoc._id,
      records: recordIds,
    });

    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// Update a patient
patientRoutes.put("/:id", auth, async (req, res) => {
  const { name, practice, records } = req.body;

  try {
    const patient = await PatientModel.findByIdAndUpdate(
      req.params.id,
      { name, practice, records },
      { new: true }
    ).populate("practice records");
    res.json(patient);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Delete a patient
patientRoutes.delete("/:id",  auth,async (req, res) => {
  try {
    await PatientModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = patientRoutes;
