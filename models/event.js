const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: String,
    date: String,
    address: String,
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    creatorName: String,
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
