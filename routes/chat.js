const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat");

router.post("/add", chatController.addContact);
router.post("/lists", chatController.getContactList);
router.delete("/chat", chatController.deleteChat);
router.get("/oneToOne", chatController.getOneToOneChats);
router.get("/sender/:id", chatController.getSenderId);
router.get("/receiver/:id", chatController.getReceiverId);

module.exports = router;
