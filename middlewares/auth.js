require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtToken = process.env.TOKEN;

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(403).send({ msg: "Missing authorization" });
      return;
    }
    jwt.verify(authorization, jwtToken, (err, user) => {
      if (err) {
        req.headers.err = err;
      }
      if (req.headers.err) {
        res.status(401).send({ msg: "Invalid jwt Token" });
        return;
      }
      req.user = user;
    });
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error while verifying jwt token", err });
  }
};

const generateToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await register.users.findOne({
      email: email,
    });
    if (user) {
      res.status(403).send({ msg: "User already exists" });
      return;
    }
    const token = jwt.sign({ email }, jwtSecret, {
      expiresIn: "30s",
    });
    req.authToken = token;
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error generating jwt token", err });
  }
};

export default {
  auth,
  generateToken,
};
