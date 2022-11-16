const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const { user } = require("./models/user");

console.log(user);
// const register = require("./models/register");
// const login = require("./models/login");
const contacts = require("./models/contact");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");

const PORT = process.env.PORT;
const io = require("socket.io")(8080, {
  cors: {
    origin: "*",
  },
});

io.on("connected", (socket) => {
  console.log(socket.id);
});

app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await user.register.findOne({
      email: email,
    });
    if (users) {
      res.status(403).send({ msg: "User already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    const userModel = new user.register(req.body);
    const response = await userModel.save();
    res.status(201).send({ id: response._id, msg: "Registration successful!" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Please check your inputs" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // TODO: validation needed for scenario where password is not passed in the body
  try {
    const users = await user.login.findOne({
      email: email,
    });

    if (!users) {
      res.status(400).send({ msg: "User doesn't exist" });
      return;
    }
    const match = await bcrypt.compare(password, users.password);

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
});

app.get("/contacts/lists", async (req, res) => {
  const response = req.query;
  try {
    const userContact = await contacts.contacts.find({
      userId: response.userId,
    });
    res.status(200).send({ userContact });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server error" });
  }
});
app.post("/contacts/add", async (req, res) => {
  try {
    const contactModel = new contacts.contacts(req.body);
    const response = await contactModel.save();
    res
      .status(201)
      .send({ id: response._id, msg: "Contact added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Server error" });
  }
});

app.listen(PORT, async () => {
  console.log(`Listening on port:${PORT}`);
  database.connect();
});
