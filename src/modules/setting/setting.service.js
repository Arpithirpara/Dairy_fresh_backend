const User = require("./setting.model");

/**
 * Change password service
 * @param {String} userId - logged-in user ka id (auth middleware se aayega)
 * @param {String} oldPassword
 * @param {String} newPassword
 * @param {String} confirmPassword
 */
const changePasswordService = async (
  userId,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  if (!oldPassword || !newPassword || !confirmPassword) {
    throw { statusCode: 400, message: "Sabhi fields zaroori hain" };
  }

  if (newPassword !== confirmPassword) {
    throw { statusCode: 400, message: "New password aur Confirm password match nahi karte" };
  }

  if (newPassword.length < 6) {
    throw { statusCode: 400, message: "New password kam se kam 6 characters ka hona chahiye" };
  }

  // password field select: false hai, isliye explicitly +password lagana padega
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw { statusCode: 404, message: "User nahi mila" };
  }

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) {
    throw { statusCode: 400, message: "Old password sahi nahi hai" };
  }

  if (oldPassword === newPassword) {
    throw { statusCode: 400, message: "Naya password purane password se alag hona chahiye" };
  }

  user.password = newPassword; // pre-save hook isko hash kar dega
  await user.save();

  return { message: "Password successfully update ho gaya" };
};

module.exports = { changePasswordService };