const express = require("express");
const router = express.Router();
const groupsCtrl = require("../../controllers/groups");

router.delete("/removeUser", groupsCtrl.removeUser);
router.post("/create", groupsCtrl.create);
router.get("/:id", groupsCtrl.getOne);
router.get("/", groupsCtrl.index);

module.exports = router;
