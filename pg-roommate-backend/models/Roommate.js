const mongoose = require("mongoose");

const roommateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    age: {
      type: Number,
      required: true
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true
    },

    city: {
      type: String,
      required: true
    },

    occupation: {
      type: String,
      required: true
    },

    budget: {
      type: Number,
      required: true
    },

    preferredLocation: {
      type: String
    },

    lifestyle: {
      type: String
    },

    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Roommate", roommateSchema);