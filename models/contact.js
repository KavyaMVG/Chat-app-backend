const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    userId: { type: String, required: true },
    contact: {
      email: { type: String, required: true },
      username: { type: String, required: true },
      id: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    collection: "contacts",
  }
);

const contact = mongoose.model("contacts", contactSchema);
exports.contact = contact;
