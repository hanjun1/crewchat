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

module.exports = {
  create,
};
