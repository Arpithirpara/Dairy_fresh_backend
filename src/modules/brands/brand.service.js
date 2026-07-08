const Brand = require("./brand.model");

// Add
const createBrand = async (data) => {
  return await Brand.create(data);
};

// Get All
const getAllBrands = async () => {
  return await Brand.find().sort({
    createdAt: -1,
  });
};

// Get By Id
const getBrandById = async (id) => {
  return await Brand.findById(id);
};

// Update
const updateBrand = async (
  id,
  data
) => {
  return await Brand.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
};

// Delete
const deleteBrand = async (id) => {
  return await Brand.findByIdAndDelete(
    id
  );
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};