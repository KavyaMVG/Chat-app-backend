const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const register = require("./models/register");
const login = require("./models/login");
const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await register.users.findOne({
      email: email,
    });
    if (user) {
      res.status(403).send({ msg: "User already exists" });
      return;
    }
    const userModel = new register.users(req.body);
    const response = await userModel.save();
    res.status(201).send({ id: response._id, msg: "Registration successful!" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Please check your inputs" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login.login.findOne({
      email: email,
      password: password,
    });
    if (!user) {
      res.status(400).send({ msg: "User doesn't exist" });
      return;
    }
    res.status(200).send({ id: user._id, msg: "Login successful!" });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, async () => {
  console.log(`Listening on port:${PORT}`);
  database.connect();
});
