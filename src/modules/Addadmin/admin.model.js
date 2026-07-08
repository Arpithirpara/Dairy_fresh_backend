const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    view: { type: Boolean, default: false },
    create: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
  },
  { _id: false }
);

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["super admin", "sales admin", "sub admin"],
      default: "sub admin",
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: Map,
      of: permissionSchema,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin1", adminSchema);