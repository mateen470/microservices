const express = require("express");
const { createRequest } = require("../controller/requestcontroller");

const router = express.Router();

router.post("/create", createRequest);

module.exports = router;
