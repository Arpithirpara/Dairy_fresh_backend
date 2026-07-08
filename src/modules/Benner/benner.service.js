const Banner = require("./benner.model");

const createBanner = async (data) => {
  return await Banner.create(data);
};

const getAllBanners = async () => {
  return await Banner.find();
};

const getBannerById = async (id) => {
  return await Banner.findById(id);
};

const updateBanner = async (id, data) => {
  return await Banner.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};

const deleteBanner = async (id) => {
  return await Banner.findByIdAndDelete(id);
};

module.exports = {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
};