const mongoose = require("mongoose");

const pgSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  rent: {
    type: Number,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Any"],
    default: "Any"
  },

  description: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Pg", pgSchema);