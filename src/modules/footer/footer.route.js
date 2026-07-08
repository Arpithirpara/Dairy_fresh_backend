const express = require("express");
const router = express.Router();

const {
  createCMS,
  getAllCMS,
  getCMSById,
  getCMSBySlug,
  updateCMS,
  deleteCMS,
  uploadMiddleware,
  uploadImage,
} = require("./footer.controller");

router.post("/add", createCMS);

// 👇 NAYA ROUTE — CKEditor isi ko call karega image upload ke liye
// IMPORTANT: /:id se upar hona zaroori hai, warna "upload-image" ko id samajh lega
router.post("/upload-image", uploadMiddleware, uploadImage);

router.get("/getall", getAllCMS);

// IMPORTANT: slug route pehle
router.get("/slug/:slug", getCMSBySlug);

router.get("/:id", getCMSById);

router.put("/:id", updateCMS);

router.delete("/:id", deleteCMS);

module.exports = router;