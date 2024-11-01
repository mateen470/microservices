const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Leave", "Equipment", "Overtime"],
    required: true,
  },
  urgency: {
    type: String,
    required: true,
  },
  superiorEmail: {
    type: String,
    required: true,
  },
  requestorEmail: {
    type: String,
    required: true,
  },
  requestorName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Request", requestSchema);
