const Subscribers = require("./subcribes.model");

const createSubscriber = async (data) => {
  return await Subscribers.create(data);
};

const getAllSubscribers = async () => {
  return await Subscribers.find() || [];
};

const getSubscriberById = async (id) => {
  return await Subscribers.findById(id);
};

const deleteSubscriber = async (id) => {
  return await Subscribers.findByIdAndDelete(id);
};

module.exports = {
  createSubscriber,
  getAllSubscribers,
  getSubscriberById,
  deleteSubscriber,
};