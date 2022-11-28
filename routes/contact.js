const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const contactController = require("../controllers/contacts");
router.get("/user", auth, contactController.contactList);
router.post("/add", contactController.addContact);

module.exports = router;
