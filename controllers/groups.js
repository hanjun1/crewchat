const Group = require("../models/group");

async function create(req, res) {
  try {
    let newGroup = await Group.create({
      name: req.body.name,
      category: req.body.category,
      link: req.body.link,
      members: [req.user._id],
      textMsgs: [],
      fileMsgs: [],
      imgMsgs: [],
      polls: [],
      events: [],
    });
    res.status(200).json(newGroup);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

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

async function getOne(req, res) {
  try {
    let group = await Group.findById(req.params.id);
    res.status(200).json(group);
  } catch (err) {
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

module.exports = {
  create,
  index,
  getOne,
  removeUser,
};
