const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
