const express = require("express");
const router = express.Router();
const groupChatController = require("../controllers/groupChat");

router.post("/addgroup", groupChatController.addGroupChat);

module.exports = router;
