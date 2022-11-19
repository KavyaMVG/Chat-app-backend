require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");
const register = require("./models/register");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const userRoutes = require("./controllers/user");
const chatRoutes = require("./controllers/chat");
const PORT = process.env.PORT;
const router = express.Router();
const { auth, generateToken } = require("./middleware/auth");

app.use(express.json());
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

router.use("/user", userRoutes);
router.use("/chat", chatRoutes);

app.post("/register", generateToken, async (req, res) => {
  const { password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);

    const userModel = new register.users(req.body);
    await userModel.save();

    res
      .status(201)
      .send({ msg: "Registration successful!", token: req.authToken });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error creating user", err });
  }
});

app.post("/login", auth, async (req, res) => {
  try {
    if (!req.user) {
      res.status(400).send({ msg: "User doesn't exist" });
      return;
    }

    res.status(200).send({ msg: "Login successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error logging in", err });
  }
});

app.listen(PORT, async () => {
  console.log(`Listening on port: ${PORT}`);
  database.connect();
});
