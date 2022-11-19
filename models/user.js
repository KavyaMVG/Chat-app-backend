const { Schema } = require("mongoose");

const userSchema = Schema(
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

exports.userSchema = { register, login };
