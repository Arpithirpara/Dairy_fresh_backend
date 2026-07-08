const { changePasswordService } = require("./setting.service");

const changePassword = async (req, res) => {
  try {
    const userId = req.user?.id; // auth middleware se aana chahiye (JWT decode ke baad)
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login again.",
      });
    }

    const result = await changePasswordService(
      userId,
      oldPassword,
      newPassword,
      confirmPassword
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.log("Change Password Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = { changePassword };