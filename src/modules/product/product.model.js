const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  p_img: {
    type: String,
    default: null,
  },
  p_images: {
    type: [String],
    default: [],
  },
  pname: {
    type: String,
    required: true,
    trim: true,
  },
  pcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  categorySlug: {
    type: String,
    default: "",
    trim: true,
  },
  pbrand:{
    type:String,
    required:true,
  },
  p_price: {
    type: Number,
    required: true,
  },
  pstock: {
    type: Number,
    required: true,
  },
  pweight: {
    type: Number,
    required: true,
  },
  pweightUnit: { type: String, default: "g" },
  pdiscount: {
    type: Number,
    default: 0,
  },
  pdescription: {
    type: String,
    default: '',
    trim: true,
  },
  variations: {
    type: [
      {
        label: { type: String },
        price: { type: Number },
        stock: { type: Number },
      },
    ],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
