const mongoose = require("mongoose");
const { Schema } = mongoose;

const loginSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

const registerSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

const register = mongoose.model("register", registerSchema);

const login = mongoose.model("login", loginSchema);

exports.user = { register, login };
