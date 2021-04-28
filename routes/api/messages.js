const express = require("express");
const router = express.Router();
const messagesCtrl = require("../../controllers/messages");

router.put("/:groupId/going", messagesCtrl.updateGoing);
router.post("/event/:groupId", messagesCtrl.createEvent);
router.post("/:groupId", messagesCtrl.create);

module.exports = router;
