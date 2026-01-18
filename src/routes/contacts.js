const express = require("express");
const router = express.Router();

// Import the controller logic
const controller = require("../controllers/contacts");

// GET all
router.get("/", controller.getAllContacts);

// GET by id
router.get("/:id", controller.getContactById);

// POST
router.post("/", controller.createContact);

// PUT
router.put("/:id", controller.updateContact);

// DELETE
router.delete("/:id", controller.deleteContact);

module.exports = router;
