const Address = require("./address.model");

// ✅ CREATE / UPDATE (UPSERT)
const createAddress = async (data, userId) => {
  const { fullName, mobile, fullAddress, pincode, city } = data;

  if (!fullName || !mobile || !fullAddress || !pincode || !city) {
    throw new Error("All fields are Required!");
  }

  return await Address.findOneAndUpdate(
    { userId },
    {
      userId,
      fullName,
      mobile,
      fullAddress,
      city,
      pincode,
    },
    { new: true, upsert: true, runValidators: true }
  );
};

// ✅ GET ALL
const getaddress = async () => {
  return await Address.find();
};

// ✅ GET BY USER
const getByidaddress = async (userId) => {
  return await Address.findOne({ userId });
};

// ✅ UPDATE BY ID
const updateadress = async (id, data) => {
  return await Address.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// ✅ DELETE
const addressdelete = async (id) => {
  return await Address.findByIdAndDelete(id);
};

module.exports = {
  createAddress,
  getaddress,
  getByidaddress,
  updateadress,
  addressdelete,
};