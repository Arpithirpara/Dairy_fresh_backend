const express = require("express");
const router = express.Router();

const subscriberController = require("./subscribers.controller");

router.post("/add", subscriberController.createSubscriber);
router.get("/getall", subscriberController.getAllSubscribers);   // ✅ typo fix
router.delete("/delete/:id", subscriberController.deleteSubscriber);
router.get("/:id", subscriberController.getSubscriberById);      // ✅ sabse last

module.exports = router;