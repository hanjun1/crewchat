const Group = require("../models/group");

async function create(req, res) {
  try {
    let group = await Group.findById(req.params.groupId);
    await group.textMsgs.push(req.body);
    await group.save();
  } catch (err) {
    console.log(req.body);
    console.log(err);
  }
}

module.exports = {
  create,
};
