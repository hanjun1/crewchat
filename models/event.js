const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date: Datetime,
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
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
  },
});

module.exports = mongoose.model("Event", eventSchema);
