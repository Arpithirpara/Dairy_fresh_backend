const express = require("express");
const {
  getcart,
  addTocart,
  clearCartController,
  decreaseCart,
  increaseCart,
  deleteitem,
} = require("../cart/cart.controller");

const auth = require("../middleware/auth.js");

const router = express.Router();

router.get("/", auth, getcart);
router.post("/", auth, addTocart);

router.put("/increase/:id", auth, increaseCart);
router.put("/decrease/:id", auth, decreaseCart);

// ✅ /clear PEHLE — /:id BAAD MEIN
router.delete("/clear", auth, clearCartController);
router.delete("/:id", auth, deleteitem);

module.exports = router;