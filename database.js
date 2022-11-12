const { MongoClient, Collection } = require("mongodb");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

const URL = process.env.MONGO_URL;

const connect = async () => {
  try {
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
