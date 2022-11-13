const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const register = require("./models/register");
const login = require("./models/login");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT;
const jwtSecret = process.env.TOKEN_KEY;

app.use(express.json());
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await register.users.findOne({
      email: email,
    });
    if (user) {
      res.status(403).send({ msg: "User already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);

    const userModel = new register.users(req.body);
    await userModel.save();
    const token = jwt.sign({ email }, jwtSecret, {
      expiresIn: "30s",
    });
    res.status(201).send({ msg: "Registration successful!", token });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Please check your inputs" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { authorization } = req.headers;

  // TODO: validation needed for scenario where password is not passed in the body
  try {
    if (!authorization) {
      res.status(401).send({ msg: "Unauthorized" });
      return;
    }
    jwt.verify(authorization, jwtSecret, (err, user) => {
      if (err) {
        req.headers.error = err;
        return;
      }
      req.user = user;
    });

    if (req.headers.error) {
      res.status(403).send({ msg: "Error verifying Token" });
      console.log(req.headers.error);
      return;
    }
    const user = await login.login.findOne({
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
    res.status(200).send({ id: user._id, msg: "Login successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, async () => {
  console.log(`Listening on port:${PORT}`);
  database.connect();
});
