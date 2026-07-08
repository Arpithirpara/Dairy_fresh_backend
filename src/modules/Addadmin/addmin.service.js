const Admin = require("./admin.model");

// Create a new admin
const createAdmin = async (payload) => {
  const existing = await Admin.findOne({ email: payload.email });
  if (existing) {
    const err = new Error("Email already exists");
    err.statusCode = 400;
    throw err;
  }

  const admin = new Admin(payload);
  return await admin.save();
};

// Get all admins
const getAllAdmins = async () => {
  return await Admin.find().sort({ createdAt: -1 });
};

// Get single admin by id
const getAdminById = async (id) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    const err = new Error("Admin not found");
    err.statusCode = 404;
    throw err;
  }
  return admin;
};

// Update admin (name, email, password, status, role, permissions)
const updateAdmin = async (id, payload) => {
  // don't overwrite password with empty string (edit page leaves it blank)
  if (payload.password === "" || payload.password === undefined) {
    delete payload.password;
  }

  const admin = await Admin.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!admin) {
    const err = new Error("Admin not found");
    err.statusCode = 404;
    throw err;
  }

  return admin;
};

// Delete admin
const deleteAdmin = async (id) => {
  const admin = await Admin.findByIdAndDelete(id);
  if (!admin) {
    const err = new Error("Admin not found");
    err.statusCode = 404;
    throw err;
  }
  return admin;
};

// Toggle active/inactive status
const toggleStatus = async (id) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    const err = new Error("Admin not found");
    err.statusCode = 404;
    throw err;
  }
  admin.isActive = !admin.isActive;
  return await admin.save();
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  toggleStatus,
};