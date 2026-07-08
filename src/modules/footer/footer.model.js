const mongoose = require("mongoose");

const cmsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      default: "",
    },

    isActive: {
  type: Boolean,
  default: true,
}
  },
  { timestamps: true }
);

module.exports = mongoose.model("CMS", cmsSchema);