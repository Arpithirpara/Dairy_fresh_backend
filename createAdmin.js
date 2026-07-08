const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./src/modules/admin/admin.model");

mongoose.connect("mongodb://localhost:27017/dairy");

const createAdmin = async () => {
  const plainPassword = process.argv[2] || "admin"; // 👈 dynamic

  const password = await bcrypt.hash(plainPassword, 10);

  const admin = new Admin({
    adminName: "admin",
    password: password,
  });

  await admin.save();

  console.log("Admin created with password:", plainPassword);
};

createAdmin();