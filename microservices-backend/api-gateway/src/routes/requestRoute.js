const express = require("express");
const proxy = require("express-http-proxy");
const authMiddleware = require("../middleware/authenticationMiddleware");

const router = express.Router();

router.use(
  "/create",
  authMiddleware,
  proxy(`${process.env.REQUEST_SERVICE_URL}/create`, {
    proxyReqPathResolver: (req) => {
      return "/create";
    },
  })
);
router.use(
  "/get-user-requests",
  authMiddleware,
  proxy(`${process.env.REQUEST_SERVICE_URL}/get-user-requests`, {
    proxyReqPathResolver: (req) => {
      return "/get-user-requests";
    },
  })
);

module.exports = router;
