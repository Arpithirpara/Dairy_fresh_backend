const {
  createAddress,
  getaddress,
  getByidaddress,
  updateadress,
  addressdelete,
} = require("./address.service");

// ✅ CREATE / UPDATE ADDRESS
const address = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const userId = req.user.id; // 🔥 JWT middleware se

    const data = await createAddress(req.body, userId);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ GET ALL
const getall = async (req, res) => {
  try {
    const data = await getaddress();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET MY ADDRESS (SECURE)
const getAddressById = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await getByidaddress(userId);

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATE
const updateAddress = async (req, res) => {
  try {
    const data = await updateadress(req.params.id, req.body);

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ DELETE
const deleteAddress = async (req, res) => {
  try {
    await addressdelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Address deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  address,
  getall,
  getAddressById,
  updateAddress,
  deleteAddress,
};