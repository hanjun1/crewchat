const express = require("express");
const router = express.Router();
const imgCtrl = require("../../controllers/uploadImage");

router.post("/", imgCtrl.uploadImage);

module.exports = router;
