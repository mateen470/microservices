const express = require("express");
const {
  sendLoginNotification,
  sendRequestNotification,
  sendLogoutNotification,
  sendRequestStatusChangeNotification,
} = require("../controller/notificationController");

const router = express.Router();

router.post("/login", sendLoginNotification);
router.post("/request", sendRequestNotification);
router.post("/request-status", sendRequestStatusChangeNotification);
router.post("/logout", sendLogoutNotification);

module.exports = router;
