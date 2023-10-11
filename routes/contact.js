const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const contactController = require("../controllers/contact");
router.get("/user", auth, contactController.contactList);
router.post("/add", contactController.addContact);
router.delete("/delete", contactController.deleteAllContacts);

module.exports = router;
