const { contact } = require("../models/contact");
const { user } = require("../models/user");
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
    const existingUser = await user.findOne({ email: req.body.email });
    if (!existingUser) {
      return res
        .status(404)
        .send({ msg: "Cannot add contact, User is not registered" });
    }
    const existingContact = contact.findOne({
      email: req.body.email,
      userId: req.body.userId,
    });
    if (existingContact) {
      return res.status(403).send({ msg: "Contact already exists" });
    }
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
