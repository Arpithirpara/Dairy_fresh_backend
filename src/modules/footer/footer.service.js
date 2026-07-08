const CMS = require("./footer.model");

const createCMS = async (data) => {
  return await CMS.create(data);
};

const getAllCMS = async () => {
  return await CMS.find();
};

const getCMSById = async (id) => {
  return await CMS.findById(id);
};

// ✅ NEW
const getCMSBySlug = async (slug) => {
  return await CMS.findOne({
    slug: slug,
    isActive: true
  });
};

const updateCMS = async (id, data) => {
  return await CMS.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};

const deleteCMS = async (id) => {
  return await CMS.findByIdAndDelete(id);
};

module.exports = {
  createCMS,
  getAllCMS,
  getCMSById,
  getCMSBySlug, // ✅ add
  updateCMS,
  deleteCMS,
};