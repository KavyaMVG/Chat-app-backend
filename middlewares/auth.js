require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.TOKEN_KEY;
const userModel = require("../models/user");

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(403).send({ msg: "Missing authorization" });
      return;
    }

    jwt.verify(authorization, jwtSecret, (err, user) => {
      if (err) {
        console.log(err);
        req.headers.err = err;
      }
      req.user = user;
    });

    if (req.headers.err) {
      res.status(401).send({ msg: "Invalid jwt Token" });
      return;
    }
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
