const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  qty:   { type: Number, required: true },
  price: { type: Number, required: true },
  unit:  { type: String, required: true },
  image: { type: String },
});

const addressSchema = new mongoose.Schema({
  fullName:    { type: String },
  mobile:      { type: String },
  fullAddress: { type: String },
  city:        { type: String },
  pincode:     { type: String },
}, { _id: false });

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer: { type: String, required: true },
    items:    [itemSchema],
    address:  addressSchema,   // 👈 add
    status: {
      type:    String,
      enum:    ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);