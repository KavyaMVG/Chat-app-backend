const { user } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.TOKEN_KEY;

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({
      email: email,
    });
    if (existingUser) {
      res.status(403).send({ msg: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    const newUser = new user(req.body);
    const response = await newUser.save();
    const token = jwt.sign(req.body, jwtSecret, {
      expiresIn: "5000s",
    });

    res.status(201).send({
      msg: "Registration successful!",
      user: {
        id: response._id,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error while creating user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await user.findOne({
      email: email,
    });

    if (!existingUser) {
      return res.status(404).send({ msg: "No user found for provided email" });
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.status(401).send({ msg: "Incorrect password" });
    }

    const token = jwt.sign(req.body, jwtSecret, {
      expiresIn: "5000s",
    });

    res.status(200).send({
      msg: "Login successful!",
      user: { id: existingUser._id, token },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error while verifying jwt token", err });
  }
};

module.exports = {
  register,
  login,
};
