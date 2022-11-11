const mongoose = require("mongoose");
const { Schema } = mongoose;

const registerSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

const users = mongoose.model("users", registerSchema);

exports.users = users;
