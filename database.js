require("dotenv").config();
const mongoose = require("mongoose");

const URL = process.env.MONGO_URL;

const connect = async () => {
  try {
    console.log("Trying to connect to DB...");
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection successful!");
  } catch (err) {
    console.error(`Couldn't connect to db${err}`);
  }
};

exports.connect = connect;
