const { userSchema } = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const users = await userSchema.register.findOne({
      email: email,
    });
    if (users) {
      res.status(403).send({ msg: "User already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    const userModel = new userSchema.register(req.body);
    const response = await userModel.save();
    res.status(201).send({ id: response._id, msg: "Registration successful!" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Please check your inputs" });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  // TODO: validation needed for scenario where password is not passed in the body
  try {
    const user = await userSchema.login.findOne({
      email: email,
    });

    if (!user) {
      res.status(400).send({ msg: "User doesn't exist" });
      return;
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).send({ msg: "Not authorized" });
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
