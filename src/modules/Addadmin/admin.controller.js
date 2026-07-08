const adminService = require("./addmin.service");

// POST /api/admin/create
const createAdmin = async (req, res) => {
  try {
    const admin = await adminService.createAdmin(req.body);
    res.status(201).json({ success: true, data: admin });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

// GET /api/admin/getall
const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.status(200).json({ success: true, data: admins });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

// GET /api/admin/:id
const getAdminById = async (req, res) => {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    res.status(200).json({ success: true, data: admin });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

// PUT /api/admin/:id
const updateAdmin = async (req, res) => {
  try {
    const admin = await adminService.updateAdmin(req.params.id, req.body);
    res.status(200).json({ success: true, data: admin });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

// DELETE /api/admin/:id
const deleteAdmin = async (req, res) => {
  try {
    await adminService.deleteAdmin(req.params.id);
    res.status(200).json({ success: true, message: "Admin deleted" });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

// PATCH /api/admin/:id/status
const toggleStatus = async (req, res) => {
  try {
    const admin = await adminService.toggleStatus(req.params.id);
    res.status(200).json({ success: true, data: admin });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  toggleStatus,
};