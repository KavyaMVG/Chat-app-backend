const { groupchat } = require("../models/groupChat");

const addGroupChat = async (req, res) => {
  try {
    const { name, members } = req.body;
    console.log(req.body);
    const userGroupChat = new groupchat({ name, members });
    const data = await userGroupChat.save();
    console.log(data);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addGroupChat,
};
