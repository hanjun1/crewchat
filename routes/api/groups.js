const express = require("express");
const router = express.Router();
const groupsCtrl = require("../../controllers/groups");

router.post("/create", groupsCtrl.create);

module.exports = router;
