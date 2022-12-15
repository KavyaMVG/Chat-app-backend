const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    msg: { type: String, required: true },
    senderId: { type: String, required: true },
    users: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "chats",
  }
);

const chat = mongoose.model("chat", chatSchema);
exports.chat = chat;
