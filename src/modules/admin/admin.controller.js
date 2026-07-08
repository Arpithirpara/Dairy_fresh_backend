const jwt = require('jsonwebtoken');
const { adminlogin } = require('../admin/admin.service');

const loginadmin = async (req, res) => {
  try {
    // ✅ Input validation
    const { adminName, password } = req.body;

    if (!adminName || !password) {
      return res.status(400).json({
        message: "adminName and password are required",
      });
    }

    const admin = await adminlogin(adminName, password);

    // ✅ JWT_SECRET check
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Token ko httpOnly cookie mein bhi bhejo (more secure)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: admin._id,
        adminName: admin.adminName,
        role: "admin",
      },
    });

  } catch (error) {
    // ✅ Better status codes - galat password vs server error alag karo
    const statusCode =
      error.message === "admin not found:" ||
      error.message === "invalid password!"
        ? 401   // Unauthorized
        : 500;  // Server error

    return res.status(statusCode).json({
      message: error.message,
    });
  }
};

module.exports = { loginadmin };