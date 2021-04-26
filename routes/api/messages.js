const express = require("express");
const router = express.Router();
const messagesCtrl = require("../../controllers/messages");

router.post("/:groupId", messagesCtrl.create);

module.exports = router;
