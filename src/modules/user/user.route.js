const express = require("express");
const {
  register,
  login,
  getUsers,
  sendOtpController,
  updateUser,
  deleteUser,
  getMe,
  getUserById,
  forgotPassword,    // ✅ NAYA
  resetPassword,       // ✅ NAYA
} = require("./user.controller");

const auth = require("../middleware/auth");

const router = express.Router();


// ================= AUTH ROUTES =================
router.post("/register", register);
router.post("/login", login);


// ================= FORGOT / RESET PASSWORD =================  ✅ NAYA
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


// ================= OTP =================
router.post("/send-otp", sendOtpController);


// ================= GET ME =================
router.get("/getuser", auth, getMe);

// ================= USERS (ADMIN / PROTECTED) =================
router.get("/users", auth, getUsers);
router.get("/users/:id", auth, getUserById);
router.put("/users/:id", auth, updateUser);
router.delete("/users/:id", auth, deleteUser);

module.exports = router;