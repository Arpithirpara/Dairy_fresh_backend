const express = require("express");
const router = express.Router();
const adminController = require('./admin.controller');

router.post("/add", adminController.createAdmin);
router.get("/getall", adminController.getAllAdmins);
router.get("/:id", adminController.getAdminById);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);
router.patch("/:id/status", adminController.toggleStatus);

module.exports = router;