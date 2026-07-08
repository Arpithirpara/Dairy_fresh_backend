const express = require("express");
const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("./category.controller");

const auth = require("../middleware/auth");

router.post("/add",  create);

router.get("/getall", getAll);

router.get("/:id", getById);

router.put("/:id",update);

router.delete("/:id",  remove);

module.exports = router;