const { groupchat } = require("../models/groupChat");

const addGroupChat = async (req, res) => {
  try {
    const { name, memberIds } = req.body;
    console.log(memberIds);
    const userGroupChat = new groupchat({ name: name, members: memberIds });
    const data = await userGroupChat.save();
    console.log(data);
    res.status(201).send({ data });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addGroupChat,
};
