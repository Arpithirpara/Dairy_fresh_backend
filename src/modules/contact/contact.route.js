const express = require("express");
const router = express.Router();
const contactController = require("./contact.controller");

// CREATE
router.post("/add", contactController.createContact);

// GET ALL
router.get("/getall", contactController.getAllContacts);

// GET BY ID
router.get("/:id", contactController.getContactById);

// UPDATE
router.put("/update/:id", contactController.updateContact);

// DELETE
router.delete("/delete/:id", contactController.deleteContact);

module.exports = router;