const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  practice: { type: mongoose.Schema.Types.ObjectId, ref: "Practice", required: true },
  records: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
});

const PatientModel = mongoose.model("Patient", patientSchema);
module.exports = {
  PatientModel
};
