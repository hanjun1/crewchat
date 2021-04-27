const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const textMsgSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    senderName: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

const fileMsgSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    senderName: String,
    fileURL: String,
  },
  {
    timestamps: true,
  }
);

const imgMsgSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    senderName: String,
    imgURL: String,
  },
  {
    timestamps: true,
  }
);

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

const pollSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: String,
    options: [pollOptionSchema],
  },
  {
    timestamps: true,
  }
);

const groupSchema = new Schema(
  {
    name: String,
    category: String,
    link: String,
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    textMsgs: [textMsgSchema],
    fileMsgs: [fileMsgSchema],
    imgMsgs: [imgMsgSchema],
    polls: [pollSchema],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Group", groupSchema);
