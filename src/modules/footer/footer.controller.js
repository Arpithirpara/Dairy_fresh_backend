// footer.controller.js

const cmsService = require("./footer.service");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

exports.createCMS = async (req, res) => {
  try {
    const data = await cmsService.createCMS(req.body);

    res.status(201).json({
      success: true,
      data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.getAllCMS = async (req, res) => {
  try {

    const data =
      await cmsService.getAllCMS();

    res.json({
      success: true,
      data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};


// GET SINGLE BY ID
exports.getCMSById = async (req, res) => {
  try {

    const data =
      await cmsService.getCMSById(
        req.params.id
      );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "CMS page not found",
      });
    }

    res.json({
      success: true,
      data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};


// GET SINGLE BY SLUG ✅
exports.getCMSBySlug = async (req, res) => {
  try {
    const data = await cmsService.getCMSBySlug(
      req.params.slug
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Page not found",
      });
    }

    res.json({
      success: true,
      data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.updateCMS = async (req, res) => {
  try {

    const data =
      await cmsService.updateCMS(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};


exports.deleteCMS = async (req, res) => {
  try {

    const cms =
      await cmsService.deleteCMS(
        req.params.id
      );

    if (!cms) {
      return res.status(404).json({
        success: false,
        message: "CMS Page Not Found",
      });
    }

    res.json({
      success: true,
      message: "CMS Page Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// =======================================================
// IMAGE UPLOAD — CKEditor ke "Insert Image" ke liye
// =======================================================

// uploads folder agar exist nahi karta to bana do
const uploadDir = path.join(__dirname, "../uploads"); // ⚠️ apne project structure ke hisaab se path check kar lena
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Route file mein middleware ke roop mein use hoga
exports.uploadMiddleware = multer({ storage: storage }).single("image");

exports.uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        success: false,
        message: "No file uploaded",
      });
    }

    const imageUrl = `http://localhost:3002/uploads/${req.file.filename}`;

    res.json({
      success: true,
      url: imageUrl,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};