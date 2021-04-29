const Group = require("../models/group");

//Create New Group
async function create(req, res) {
  try {
    let newGroup = await Group.create({
      name: req.body.name,
      category: req.body.category,
      members: [req.user._id],
    });
    res.status(200).json(newGroup);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

//Join Existing Group
async function join(req, res) {
  try {
    // extracts group id from pasted link
    let groupId = req.body.link.split("/").slice(-1)[0];
    let group = await Group.findById(groupId);
    //check if not already in group
    let match = group.members.includes(req.user._id);
    if (!match) {
      group.members.push(req.user._id);
      await group.save();
      console.log("added to group");
    } else {
      console.log("already in group");
    }
    res.json(groupId);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

//Fetch all Groups for user
async function index(req, res) {
  try {
    let groups = await Group.find({ members: req.user._id })
      .slice("textMsgs", -40)
      .populate("members");
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

//Fetch one specific Group
async function getOne(req, res) {
  try {
    let group = await Group.findById(req.params.id);
    await group.populate("msgs.sender").execPopulate();
    await group.populate("msgs.event.attendees").execPopulate();
    await group.populate("msgs.sender").execPopulate();
    await group.populate("msgs.poll.options.voters").execPopulate();
    res.status(200).json(group.msgs);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

async function removeUser(req, res) {
  try {
    let group = await Group.findById(req.body.groupId);
    await group.populate("members").execPopulate();
    for (let i = 0; i < group.members.length; i++) {
      if (group.members[i]._id == req.body.userId) {
        group.members.splice(i, 1);
        break;
      }
    }
    await group.save();
    res.status(200).json(group);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
}

async function edit(req, res) {
  try {
    let group = await Group.findById(req.params.id);
    group.picture = req.body.picture;
    group.save();
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
}

module.exports = {
  create,
  join,
  index,
  getOne,
  removeUser,
  edit,
};
