require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.TOKEN_KEY;
const bcrypt = require("bcrypt");
const userModel = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      email: email,
    });
    if (!user)
      return res.status(404).send({ msg: "No user found for provided email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send({ msg: "Incorrect password" });
    const token = jwt.sign({ email }, jwtSecret, {
      expiresIn: "5000s",
    });
    req.authToken = token;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error while verifying jwt token", err });
  }
};

const generateToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({
      email: email,
    });
    if (user) {
      res.status(403).send({ msg: "User already exists" });
      return;
    }
    const token = jwt.sign({ email }, jwtSecret, {
      expiresIn: "5000s",
    });
    req.authToken = token;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error generating jwt token", err });
  }
};

module.exports = {
  auth,
  generateToken,
};
