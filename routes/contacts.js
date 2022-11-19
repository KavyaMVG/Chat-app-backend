const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contacts");
router.get("/user", contactController.contactList);
router.post("/add", contactController.addContact);

module.exports = router;
