const mongoose = require("mongoose");
const { Schema } = mongoose;

const loginSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

const login = mongoose.model("login", loginSchema);

exports.login = login;
