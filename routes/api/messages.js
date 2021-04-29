const express = require("express");
const router = express.Router();
const messagesCtrl = require("../../controllers/messages");

router.put("/:groupId/vote", messagesCtrl.updateVote);
router.put("/:groupId/unvote", messagesCtrl.updateUnvote);
router.put("/:groupId/notgoing", messagesCtrl.updateNotGoing);
router.put("/:groupId/going", messagesCtrl.updateGoing);
router.post("/event/:groupId", messagesCtrl.createEvent);
router.post("/poll/:groupId", messagesCtrl.createPoll);
router.post("/:groupId", messagesCtrl.create);

module.exports = router;
