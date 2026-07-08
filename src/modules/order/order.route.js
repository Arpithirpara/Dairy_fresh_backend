const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrder,
  deleteOrder,
} = require("../order/order.controller");


router.post("/order", createOrder);

router.get("/orders", getAllOrders);

// IMPORTANT: order by id route
router.get("/order/:id", getOrderById);

// 
router.get("/orders/user/:userId", getUserOrders);

router.put("/order/:id", updateOrder);

router.delete("/order/:id", deleteOrder);

module.exports = router;