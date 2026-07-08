const mongoose = require("mongoose");

const subscribersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscribers", subscribersSchema);