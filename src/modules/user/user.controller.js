const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  createuser,
  findEmail,
  getAllUsers,
  findMobile,
  updateById,
  deleteById,
  findById,
  saveResetToken,        // ✅ NAYA
  findByResetToken,       // ✅ NAYA
  resetPasswordById,      // ✅ NAYA
} = require("./user.service");

const {
  sendOtp,
  verifyOtp,
  removeOtp,
} = require("../otp/otp.service");

const {
  sendResetPasswordEmail,  // ✅ NAYA
} = require("./Mail.service");


// ================= SEND OTP =================
const sendOtpController = async (req, res) => {
  try {
    const { email } = req.body;

    const existsUser = await findEmail(email);
    if (existsUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    await sendOtp(email);

    return res.status(200).json({
      message: "OTP sent successfully",
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// ================= REGISTER =================
const register = async (req, res) => {
  try {
    const { name, email, mobile, password, otp } = req.body;

    const existsUser = await findEmail(email);
    if (existsUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const existsMobile = await findMobile(mobile);
    if (existsMobile) {
      return res.status(400).json({ message: "Mobile already exists" });
    }

    const isValidOtp = verifyOtp(email, String(otp));
    if (!isValidOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    removeOtp(email);

    const user = await createuser({
      name,
      email,
      mobile,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully!",
      data: user,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful!",
      token,
      user,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// ================= FORGOT PASSWORD =================  ✅ NAYA
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 15 * 60 * 1000; // 15 minutes

    await saveResetToken(email, token, expires);

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await sendResetPasswordEmail(email, resetLink);

    return res.status(200).json({
      message: "Reset link sent to your email",
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// ================= RESET PASSWORD =================  ✅ NAYA
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    const user = await findByResetToken(token);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    await resetPasswordById(user._id, password);

    return res.status(200).json({
      message: "Password reset successful",
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// ================= GET ME =================
const getMe = async (req, res) => {
  try {
    const user = await findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found"});
    }

    return res.status(200).json({
      message: "Success",
      data: user,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= GET ALL USERS =================
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// ================= UPDATE =================
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await updateById(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      data: user,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// ================= DELETE =================
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await deleteById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// ================= EXPORT =================
module.exports = {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser,
  sendOtpController,
  getMe,
  getUserById,
  forgotPassword,    // ✅ NAYA
  resetPassword,      // ✅ NAYA
};