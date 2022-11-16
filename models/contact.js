const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
  },
  {
    collection: "contacts",
  }
);

const contacts = mongoose.model("contacts", contactSchema);
exports.contacts = contacts;
