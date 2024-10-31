const express = require("express");
const proxy = require("express-http-proxy");
const authMiddleware = require("../middleware/authenticationMiddleware");

const router = express.Router();

router.use("/", authMiddleware, proxy("http://localhost:4002"));

module.exports = router;
