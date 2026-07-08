const Category = require("./category.model");
const mongoose = require("mongoose");

const createCategory = async (data) => {
  return await Category.create(data);
};

const getAllCategories = async () => {
  return await Category.find()
    .populate("parentCategory");
};

const getCategoryById = async (id) => {
  return await Category.findById(id)
    .populate("parentCategory");
};

const getCategoryByIdOrSlug = async (identifier) => {
  if (mongoose.Types.ObjectId.isValid(identifier)) {
    const byId = await Category.findById(identifier).populate("parentCategory");
    if (byId) return byId;
  }

  return await Category.findOne({ slug: identifier })
    .populate("parentCategory");
};

const updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryByIdOrSlug,
  updateCategory,
  deleteCategory,
};
