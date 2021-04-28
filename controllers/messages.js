const Group = require("../models/group");
const Event = require("../models/event");

async function create(req, res) {
  try {
    let group = await Group.findById(req.params.groupId);
    await group.textMsgs.push({
      sender: req.body.sender,
      senderName: req.body.senderName,
      content: req.body.textContent,
    });
    await group.save();
    res.status(200).json("okay!");
  } catch (err) {
    console.log(req.body);
    console.log(err);
    res.status(400).json("error");
  }
}

async function createEvent(req, res) {
  try {
    let group = await Group.findById(req.params.groupId);
    let event = await Event.create(req.body);
    await group.events.push(event);
    await group.save();
    res.status(200).json("okay!");
  } catch (err) {
    res.status(400).json("error");
  }
}

module.exports = {
  create,
  createEvent,
};
