const express = require("express");
const router = express.Router();


const { changePassword } = require("./setting.controller");
// PUT /api/settings/change-password
router.put("/update", changePassword);

module.exports = router;