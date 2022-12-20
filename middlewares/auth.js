require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.TOKEN_KEY;

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(403).send({ msg: "Missing auth token" });
  try {
    jwt.verify(authorization, jwtSecret, (err, user) => {
      if (err) {
        req.header.err = err;
        return;
      }
      console.log();
      req.user = user;
    });
    if (req.header.err) {
      return res.status(401).send({ msg: "Invalid auth token" });
    }
    next();
  } catch (err) {
    return res.status(500).send({ msg: "Error while parsing auth token" });
  }
};

module.exports = {
  auth,
};
