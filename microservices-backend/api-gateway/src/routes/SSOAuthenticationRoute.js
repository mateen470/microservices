const express = require("express");
const proxy = require("express-http-proxy");

const router = express.Router();

router.use("/", proxy(process.env.SSO_AUTH_SERVICE_URL));

module.exports = router;
