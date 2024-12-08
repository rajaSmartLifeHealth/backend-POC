const mongoose = require("mongoose");

const practiceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true }, // e.g., 'Mental Health', 'Vaccinations'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Practice", practiceSchema);
