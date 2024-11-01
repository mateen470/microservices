const express = require("express");
const proxy = require("express-http-proxy");
const authMiddleware = require("../middleware/authenticationMiddleware");

const router = express.Router();

router.use("/", authMiddleware, proxy(process.env.NOTIFICATION_SERVICE_URL));

module.exports = router;
