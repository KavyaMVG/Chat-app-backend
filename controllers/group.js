const { group } = require("../models/group");

const addGroupChat = async (req, res) => {
  try {
    const { name, members, admin } = req.body;
    console.log(req.body);
    const userGroupChat = new group({ name, members, admin });
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
    const userGroupChat = await group.find({
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
