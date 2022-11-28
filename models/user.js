const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "users",
  }
);
const user = mongoose.model("user", userSchema);
exports.user = user;
