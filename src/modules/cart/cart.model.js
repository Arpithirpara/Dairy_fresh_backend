const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    // Future user support
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Future product support
    productId: {
            type:String,
            sparse:true,
            unique:true,
    },

    // Product details (required for now)
    itemname: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    itemPrice: {
      type: Number,
      required: true,
    },

    item_qty: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);