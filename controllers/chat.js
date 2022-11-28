const chat = require("../models/chat");

const addContact = async (req, res) => {
  const message = req.body;
  try {
    const chatModel = new chat.chat(message);
    const response = await chatModel.save();
    res.status(201).send({ msg: response.msg, id: response._id });
  } catch (err) {
    console.log(err);
    res.status(404).send({ msg: "Client error" });
  }
};

const getContactList = async (req, res) => {
  const message = req.query;
  try {
    const chatModel = await chat.chat.findOne({
      chat: message.id,
    });
    res.status(200).send({ chatModel });
  } catch (err) {
    console.log(err);
  }
};

const deleteChat = async (req, res) => {
  const response = req.query;
  try {
    const deleteModel = await chat.chat.deleteOne({
      chatId: response.id,
    });
    res.status(200).send({ deleteModel });
  } catch (err) {
    console.log(err);
  }
};

const getSenderId = async (req, res) => {
  const senderChat = req.params.id;
  try {
    const senderModel = await chat.chat.findOne({
      senderId: senderChat,
    });
    res.status(200).send({ senderModel });
  } catch (err) {
    res.status(500).send({ msg: "Server error" });
  }
};

const getReceiverId = async (req, res) => {
  const receiverChat = req.params.id;
  try {
    const receiverModel = await chat.chat.findOne({
      receiverId: receiverChat,
    });
    res.status(200).send({ receiverModel });
  } catch (err) {
    res.status(500).send({ msg: "Server error" });
  }
};

const getOneToOneChats = async (req, res) => {
  const { senderId, receiverId } = req.query;
  try {
    const chatModel = await chat.chat.find({
      senderId: senderId,
      receiverId: receiverId,
    });
    res.status(200).send({ chats: chatModel });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addContact,
  getContactList,
  deleteChat,
  getSenderId,
  getReceiverId,
  getOneToOneChats,
};
