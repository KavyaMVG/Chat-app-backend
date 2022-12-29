const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group");

router.post("/addgroup", groupController.addGroupChat);
router.get("/getgroup", groupController.getGroupChat);

module.exports = router;
