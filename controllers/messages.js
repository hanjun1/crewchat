const Group = require("../models/group");
const User = require("../models/user");

async function create(req, res) {
  try {
    let group = await Group.findById(req.params.groupId);
    await group.msgs.push({
      type: "text",
      sender: req.body.sender,
      senderName: req.body.senderName,
      text: {
        content: req.body.textContent,
      },
    });
    await group.save();
    console.log(group.msgs[group.msgs.length - 1]);
    res.status(200).json(group.msgs[group.msgs.length - 1]);
  } catch (err) {
    console.log(req.body);
    console.log(err);
    res.status(400).json("error");
  }
}

async function createEvent(req, res) {
  try {
    let group = await Group.findById(req.params.groupId);
    await group.msgs.push({
      type: "event",
      sender: req.body.sender,
      senderName: req.body.senderName,
      event: req.body.event,
    });
    await group.save();
    await group.populate("msgs.sender").execPopulate();
    await group.populate("msgs.event.attendees").execPopulate();
    await group.populate("msgs.poll.options.voters").execPopulate();
    res.status(200).json(group.msgs[group.msgs.length - 1]);
  } catch (err) {
    res.status(400).json("error");
  }
}

async function createPoll(req, res) {
  try {
    let group = await Group.findById(req.params.groupId);
    let temp = {
      ...req.body.poll,
      totalPeople: group.members.length,
    };
    await group.msgs.push({
      type: "poll",
      sender: req.body.sender,
      senderName: req.body.senderName,
      poll: temp,
    });
    await group.save();
    res.status(200).json(group.msgs[group.msgs.length - 1]);
  } catch (err) {
    res.status(400).json("error");
  }
}

async function updateGoing(req, res) {
  try {
    let user = await User.findById(req.body.userId);
    let group = await Group.findById(req.body.groupId);
    await group.populate("msgs").execPopulate();
    await group.populate("msgs.sender").execPopulate();
    await group.populate("msgs.event.attendees").execPopulate();
    await group.populate("msgs.poll.options.voters").execPopulate();
    let msg = await group.msgs.id(req.body.msgId);
    await msg.event.attendees.push(user);
    await group.save();
    res.status(200).json(group.msgs);
  } catch (err) {
    res.status(400).json("error");
  }
}

async function updateNotGoing(req, res) {
  try {
    let group = await Group.findById(req.body.groupId);
    await group.populate("msgs").execPopulate();
    await group.populate("msgs.sender").execPopulate();
    await group.populate("msgs.event.attendees").execPopulate();
    await group.populate("msgs.poll.options.voters").execPopulate();
    let msg = await group.msgs.id(req.body.msgId);
    for (let i = 0; i < msg.event.attendees.length; i++) {
      if (req.body.userId == msg.event.attendees[i]._id) {
        await msg.event.attendees.splice(i, 1);
        break;
      }
    }
    await group.save();
    res.status(200).json(group.msgs);
  } catch (err) {
    console.log(err);
    res.status(400).json("error");
  }
}

async function updateVote(req, res) {
  try {
    let group = await Group.findById(req.body.groupId);
    let user = await User.findById(req.body.userId);
    await group.populate("msgs").execPopulate();
    await group.populate("msgs.sender").execPopulate();
    await group.populate("msgs.event.attendees").execPopulate();
    await group.populate("msgs.poll.options.voters").execPopulate();
    let msg = await group.msgs.id(req.body.msgId);
    for (let i = 0; i < msg.poll.options.length; i++) {
      if (req.body.optionId == msg.poll.options[i]._id) {
        await msg.poll.options[i].voters.push(user);
        msg.poll.totalPeople = group.members.length;
        break;
      }
    }
    await group.save();
    res.status(200).json(group.msgs);
  } catch (err) {
    console.log(err);
    res.status(400).json("error");
  }
}

async function updateUnvote(req, res) {
  try {
    let group = await Group.findById(req.body.groupId);
    await group.populate("msgs").execPopulate();
    await group.populate("msgs.sender").execPopulate();
    await group.populate("msgs.event.attendees").execPopulate();
    await group.populate("msgs.poll.options.voters").execPopulate();
    let msg = await group.msgs.id(req.body.msgId);
    for (let i = 0; i < msg.poll.options.length; i++) {
      if (req.body.optionId == msg.poll.options[i]._id) {
        for (let y = 0; y < msg.poll.options[i].voters.length; y++) {
          if (req.body.userId == msg.poll.options[i].voters[y]._id) {
            await msg.poll.options[i].voters.splice(y, 1);
            msg.poll.totalPeople = group.members.length;
            break;
          }
        }
      }
    }
    await group.save();
    res.status(200).json(group.msgs);
  } catch (err) {
    console.log(err);
    res.status(400).json("error");
  }
}

module.exports = {
  create,
  createEvent,
  updateGoing,
  updateNotGoing,
  createPoll,
  updateVote,
  updateUnvote,
};
