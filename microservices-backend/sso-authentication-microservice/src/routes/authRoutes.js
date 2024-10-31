const express = require("express");
const { googleLogin } = require("../controller/authController");

const router = express.Router();

router.post("/", googleLogin);

module.exports = router;

