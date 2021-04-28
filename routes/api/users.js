const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

router.post("/signup", usersCtrl.create);
router.post("/login", usersCtrl.login);
router.put("/edit", usersCtrl.edit);

module.exports = router;
