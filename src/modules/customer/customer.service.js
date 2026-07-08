const Customer = require("./customer.model");

const createCustomer = async (data) => {
  return await Customer.create(data);
};

const getAllCustomers = async () => {
  return await Customer.find();
};

const getCustomerById = async (id) => {
  return await Customer.findById(id);
};

const updateCustomer = async (id, data) => {
  return await Customer.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};

const deleteCustomer = async (id) => {
  return await Customer.findByIdAndDelete(id);
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};