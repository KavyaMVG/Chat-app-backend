const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupChatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admin: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "groupchat",
  }
);

const groupchat = mongoose.model("groupchat", groupChatSchema);
exports.groupchat = groupchat;
