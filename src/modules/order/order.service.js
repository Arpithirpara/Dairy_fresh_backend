const Order = require("../order/oder.model");

const createOrder = async (body) => {
  const { user, customer, items, address, total } = body;
  return await Order.create({ user, customer, items, address, total });
};

const getAllOrders = async () => {
  return await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
};

const getUserOrders = async (userId) => {
  return await Order.find({ user: userId })
    .sort({ createdAt: -1 });
};


const getOrderById = async(id)=>{
   return await Order.findById(id)
     .populate("user");
}

const updateOrder = async (id, data) => {
  return await Order.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};

const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,   // <-- ADD THIS
  getUserOrders,
  updateOrder,
  deleteOrder,
};