const express = require("express");
const {
  sendLoginNotification,
} = require("../controller/notificationController");

const router = express.Router();

router.post("/", sendLoginNotification);

module.exports = router;
