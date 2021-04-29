const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const textMsgSchema = new Schema(
//   {
//     sender: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//     senderName: String,
//     content: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// const fileMsgSchema = new Schema(
//   {
//     sender: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//     senderName: String,
//     fileURL: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// const imgMsgSchema = new Schema(
//   {
//     sender: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//     senderName: String,
//     fileURL: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// const pollSchema = new Schema(
//   {
//     creator: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//     description: String,
//     options: [pollOptionSchema],
//   },
//   {
//     timestamps: true,
//   }
// );

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
    },
    img: {
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
    link: String,
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
