const subscriberService = require("./subscribers.service");

const createSubscriber = async (req, res) => {
  try {
    const subscriber = await subscriberService.createSubscriber(req.body);

    res.status(201).json({
      success: true,
      data: subscriber,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const data = await subscriberService.getAllSubscribers();

    res.status(200).json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSubscriberById = async (req, res) => {
  try {
    const subscriber = await subscriberService.getSubscriberById(
      req.params.id
    );

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    res.status(200).json({
      success: true,
      data: subscriber,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteSubscriber = async (req, res) => {
  try {
    const deleted = await subscriberService.deleteSubscriber(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscriber deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSubscriber,
  getAllSubscribers,
  getSubscriberById,
  deleteSubscriber,
};