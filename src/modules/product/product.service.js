const Product = require('./product.model');
const Category = require("../category/category.model");

function buildProductData(data = {}) {
  const next = { ...data };

  if (next.categoryId && typeof next.categoryId === "object") {
    next.categoryId = next.categoryId._id || next.categoryId.id || null;
  }

  if (next.categoryId === "") {
    next.categoryId = null;
  }

  if (next.pcategory && typeof next.pcategory === "object") {
    next.pcategory = next.pcategory._id || next.pcategory.id || null;
  }

  if (next.pcategory === "") {
    next.pcategory = null;
  }

  if (next.categorySlug && typeof next.categorySlug === "object") {
    next.categorySlug = next.categorySlug.slug || next.categorySlug.name || "";
  }

  return next;
}

const attachCategoryFields = async (data = {}) => {
  const next = buildProductData(data);

  const categoryRef = next.categoryId || next.pcategory || null;

  if (categoryRef) {
    const category = await Category.findById(categoryRef).lean();
    if (category) {
      next.pcategory = category._id;
      next.categoryId = category._id;
      next.categorySlug = category.slug;
    }
  }

  return next;
};

const createProduct = async (data) => {
  const product = new Product(await attachCategoryFields(data));
  return await product.save();
};

const getAllProducts = async () => {
  return await Product.find()
    .populate("pcategory", "name slug image")
    .populate("categoryId", "name slug image");
};

const getProductById = async (id) => {
  return await Product.findById(id)
    .populate("pcategory", "name slug image")
    .populate("categoryId", "name slug image");
};

const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(
    id,
    await attachCategoryFields(data),
    { new: true }
  )
    .populate("pcategory", "name slug image")
    .populate("categoryId", "name slug image");
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
