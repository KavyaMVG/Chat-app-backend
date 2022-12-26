const { groupchat } = require("../models/groupChat");

const addGroupChat = async (req, res) => {
  try {
    const { name, members, admin } = req.body;
    console.log(req.body);
    const userGroupChat = new groupchat({ name, members, admin });
    const data = await userGroupChat.save();
    console.log(data);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getGroupChat = async (req, res) => {
  const { admin } = req.query;
  try {
    const userGroupChat = await groupchat.find({
      admin,
    });
    res.status(200).send({ userGroupChat });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addGroupChat,
  getGroupChat,
};
