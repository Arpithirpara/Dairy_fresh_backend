const express = require("express");
const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("./customer.controller");

const auth = require("../middleware/auth");

router.post("/create", auth, create);

router.get("/", auth, getAll);

router.get("/:id", auth, getById);  

router.put("/:id", auth, update);

router.delete("/:id", auth, remove);

module.exports = router;