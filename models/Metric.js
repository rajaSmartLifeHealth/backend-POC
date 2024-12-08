const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required : true },
  createdAt: { type: Date, default: Date.now }
});

const metricModel = mongoose.model("Metric", metricSchema);

module.exports = {
  metricModel
}
