const Contact = require("./contact.model");

// CREATE
const createContact = async (data) => {
  const contact = new Contact(data);
  return await contact.save();
};

// GET ALL
const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

// GET BY ID
const getContactById = async (id) => {
  return await Contact.findById(id);
};

// UPDATE
const updateContact = async (id, data) => {
  return await Contact.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};