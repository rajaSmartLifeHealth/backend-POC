const mongoose = require("mongoose");

const kpiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  filters: { type: Map, of: String }, // e.g., { category: 'Mental Health', practice: 'Vaccination' }
  relatedEntities: {
    metrics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Metric" }],
    records: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
    practices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Practice" }],
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }], // Added Patient reference
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // Added Category reference
  },
  createdAt: { type: Date, default: Date.now },
});

const KPIModel = mongoose.model("KPI", kpiSchema);

module.exports = {
  KPIModel
};
