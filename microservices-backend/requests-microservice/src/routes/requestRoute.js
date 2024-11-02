const express = require("express");
const {
  createRequest,
  getUserRequests,
} = require("../controller/requestcontroller");

const router = express.Router();

router.post("/create", createRequest);
router.get("/get-user-requests", getUserRequests);

module.exports = router;
