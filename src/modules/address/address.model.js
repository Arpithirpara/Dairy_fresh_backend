const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  mobile: {
    type: String,
    required: true,
  },

  fullAddress: {
    type: String,
    required: true,
    trim: true,
  },

  city: {
    type: String,
    required: true,
    trim: true,
  },

  pincode: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Address", AddressSchema);