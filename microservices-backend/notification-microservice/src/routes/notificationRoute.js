const express = require("express");
const {
  sendLoginNotification,
  sendRequestNotification,
  sendLogoutNotification,
} = require("../controller/notificationController");

const router = express.Router();

router.post("/login", sendLoginNotification);
router.post("/request", sendRequestNotification);
router.post("/logout", sendLogoutNotification);

module.exports = router;
