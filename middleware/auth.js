require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtToken = process.env.TOKEN;

exports.auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.send({ msg: "Unauthorized" });
      return;
    }
    jwt.verify(authorization, jwtToken, (err, user) => {
      if (err) {
        req.headers.err = err;
      }
      if (req.headers.err) {
        res.status(401).send({ msg: "Your JWT token might have expired" });
        return;
      }
      req.user = user;
    });
    next();
  } catch (err) {
    res.status(500).send({ msg: "Error while verifying jwt token" });
  }
};
