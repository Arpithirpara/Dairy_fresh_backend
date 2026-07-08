const OrderService = require("../order/order.service");

const createOrder = async (req, res) => {
  try {
    const order = await OrderService.createOrder(req.body);

    res.status(201).json({
      success: true,
      order: order,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

const getAllOrders = async (req, res) => {
  try {

    const orders =
      await OrderService.getAllOrders();

    res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};


/* ADD THIS */

const getOrderById = async (req, res) => {

  try {

    const order =
      await OrderService.getOrderById(
        req.params.id
      );

    if (!order) {

      return res.status(404).json({
        success: false,
        message: "Order not found",
      });

    }

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};


const getUserOrders = async (req, res) => {
  try {

    const orders =
      await OrderService.getUserOrders(
        req.params.userId
      );

    res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

const updateOrder = async (req, res) => {

  try {

    const order =
      await OrderService.updateOrder(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

const deleteOrder = async (req, res) => {

  try {

    await OrderService.deleteOrder(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Order deleted",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,   // <-- ADD THIS
  getUserOrders,
  updateOrder,
  deleteOrder
};