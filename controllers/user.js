const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const users = await userModel.findOne({
      email: email,
    });
    if (users) {
      res.status(403).send({ msg: "User already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    const user = new userModel(req.body);
    const response = await user.save();
    res.status(201).send({
      msg: "Registration successful!",
      user: {
        id: response._id,
        token: req.authToken,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Please check your inputs" });
  }
};

const login = async (req, res, next) => {
  const { email } = req.body;
  // TODO: validation needed for scenario where password is not passed in the body
  try {
    const user = await userModel.findOne({
      email: email,
    });

    if (!user) {
      res.status(400).send({ msg: "User doesn't exist" });
      return;
    }
    res
      .status(200)
      .send({ id: user._id, msg: "Login successful!", id: user._id });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  register,
  login,
};
