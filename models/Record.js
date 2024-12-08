const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'Mental Health', 'Metabolic'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Record", recordSchema);
