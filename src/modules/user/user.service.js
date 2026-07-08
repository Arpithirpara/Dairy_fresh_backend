const User = require("./user.model");


// ================= CREATE USER =================
const createuser = async (data) => {
  try {
    const user = new User(data);
    return await user.save();
  } catch (error) {
    throw error;
  }
};


// ================= FIND BY EMAIL =================
const findEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw error;
  }
};


// ================= GET ALL USERS =================
const getAllUsers = async () => {
  try {
    return await User.find().select("-password");
  } catch (error) {
    throw error;
  }
};


// ================= FIND BY MOBILE =================
const findMobile = async (mobile) => {
  try {
    return await User.findOne({ mobile });
  } catch (error) {
    throw error;
  }
};


// ================= FIND BY ID =================  ✅ NAYA
const findById = async (id) => {
  try {
    return await User.findById(id).select("-password");
  } catch (error) {
    throw error;
  }
};


// ============= UPDATE USER ================
const updateById = async (id, data) => {
  try {
    return await User.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");
  } catch (error) {
    throw error;
  }
};


// ================= DELETE USER =================
const deleteById = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};


// ================= SAVE RESET TOKEN =================  ✅ NAYA (FORGOT PASSWORD)
const saveResetToken = async (email, token, expires) => {
  try {
    return await User.findOneAndUpdate(
      { email },
      {
        resetPasswordToken: token,
        resetPasswordExpires: expires,
      },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};


// ================= FIND BY RESET TOKEN =================  ✅ NAYA (RESET PASSWORD)
const findByResetToken = async (token) => {
  try {
    return await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  } catch (error) {
    throw error;
  }
};


// ================= RESET PASSWORD (update + clear token) =================  ✅ NAYA
const resetPasswordById = async (id, hashedPassword) => {
  try {
    return await User.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      { new: true }
    ).select("-password");
  } catch (error) {
    throw error;
  }
};


module.exports = {
  findEmail,
  createuser,
  getAllUsers,
  findMobile,
  updateById,
  deleteById,
  findById,           // ✅ NAYA
  saveResetToken,      // ✅ NAYA
  findByResetToken,    // ✅ NAYA
  resetPasswordById,   // ✅ NAYA
};