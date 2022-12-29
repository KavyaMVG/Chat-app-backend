const express = require("express");
const router = express.Router();
const groupChatController = require("../controllers/groupChat");

router.post("/addGroupChat", groupChatController.addGroupChat);
router.get("/groupMsg", groupChatController.getGroupMsg);

module.exports = router;
