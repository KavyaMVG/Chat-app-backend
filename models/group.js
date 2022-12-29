const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema(
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
    collection: "group",
  }
);

const group = mongoose.model("group", groupSchema);
exports.group = group;
