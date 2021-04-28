const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

/*----------Unprotected routes here ----*/
router.post("/signup", usersCtrl.create);
router.post("/login", usersCtrl.login);

/*---------- Protected Routes ----------*/
router.use(require("../../config/auth"));
router.get("/", usersCtrl.getOne);
router.put("/edit", usersCtrl.edit);

module.exports = router;
