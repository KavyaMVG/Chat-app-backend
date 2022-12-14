const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupChatSchema = new Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },

    senderId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "groupchat",
  }
);

const groupChat = mongoose.model("groupchat", groupChatSchema);
exports.groupChat = groupChat;
