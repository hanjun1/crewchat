const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollOptionSchema = new Schema(
  {
    option: String,
    voters: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MsgSchema = new Schema(
  {
    type: String,
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    senderName: String,
    text: {
      content: String,
    },
    file: {
      fileURL: String,
      fileSize: String,
      fileName: String,
    },
    image: {
      imgFileURL: String,
    },
    poll: {
      question: String,
      options: [pollOptionSchema],
      totalPeople: Number,
    },
    event: {
      name: String,
      date: String,
      address: String,
      attendees: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const groupSchema = new Schema(
  {
    name: String,
    category: String,
    picture: {
      type: String,
      default: "",
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    msgs: [MsgSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Group", groupSchema);
