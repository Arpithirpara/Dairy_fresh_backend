const express = require("express");
const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("./benner.controller");

const auth = require("../middleware/auth");


// CREATE
router.post("/create", auth, create);

// GET ALL
router.get("/getall", getAll);

// GET SINGLE
router.get("/:id", getById);

// UPDATE
router.put("/:id", auth, update);

// DELETE
router.delete("/:id", auth, remove);

module.exports = router;