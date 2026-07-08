const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      default: "",
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    mobile: {
      type: String,
      unique: true,
    },

    dob: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },

    status: {
      type: String,
      default: "Active",
    },

    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);