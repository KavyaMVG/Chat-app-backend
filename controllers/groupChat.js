const { groupChat } = require("../models/groupChat");

const addGroupChat = async (req, res) => {
  const { msg, senderId, groupId } = req.body;
  const data = {
    groupId,
    msg,
    senderId,
  };
  try {
    const groupChatModel = new groupChat(data);
    const response = await groupChatModel.save();
    console.log("RES", response);
    res.status(201).send(response);
  } catch (err) {
    console.log(err);
    res.status(404).send({ msg: "Client error" });
  }
};

const getGroupMsg = async (req, res) => {
  const { groupId } = req.query;
  try {
    const groupMsg = await groupChat.find({
      groupId,
    });
    console.log("MSG", groupMsg);
    res.status(200).send({ groupMsg });
  } catch (err) {
    res.status(500).send({ msg: "Server error" });
  }
};

module.exports = {
  addGroupChat,
  getGroupMsg,
};
