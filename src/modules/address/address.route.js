const {
  address,
  getall,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require("../address/address.controller");

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");

// ✅ CREATE / UPDATE
router.post("/address", authMiddleware, address);

// ✅ GET ALL (admin / testing)
router.get("/address", getall);

// ✅ GET MY ADDRESS (secure user route)
router.get("/address/me", authMiddleware, getAddressById);

// ✅ UPDATE
router.put("/address/:id", authMiddleware, updateAddress);

// ✅ DELETE
router.delete("/address/:id", authMiddleware, deleteAddress);




router.get("/address/user/:userId", authMiddleware, async (req, res) => {
  try {
    const Address = require("../address/address.model");
    const address = await Address.findOne({ userId: req.params.userId });
    res.json({ success: true, data: address });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;