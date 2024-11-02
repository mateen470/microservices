const express = require("express");
const {
  createRequest,
  getUserRequests,
  getSpecificRequest,
  getPendingRequests,
  updateRequestStatus,
} = require("../controller/requestcontroller");

const router = express.Router();

router.post("/create", createRequest);
router.get("/get-user-requests", getUserRequests);
router.get("/get-specific-request/:id", getSpecificRequest);
router.get("/get-pending-requests", getPendingRequests);
router.put("/update-specific-request/:id", updateRequestStatus);

module.exports = router;
