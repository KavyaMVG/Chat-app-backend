const { contact } = require("../models/contact");

const contactList = async (req, res) => {
  const { userId } = req.query;
  try {
    const userContact = await contact.find({
      userId: userId,
    });
    res.status(200).send({ userContact });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server error" });
  }
};

const addContact = async (req, res) => {
  try {
    console.log(req.body);
    const contactModel = new contact(req.body);
    const response = await contactModel.save();
    res
      .status(201)
      .send({ id: response._id, msg: "Contact added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server error" });
  }
};

module.exports = {
  contactList,
  addContact,
};
