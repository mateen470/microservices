const express = require("express");
const proxy = require("express-http-proxy");
const authMiddleware = require("../middleware/authenticationMiddleware");

const router = express.Router();

router.use(
  "/login",
  authMiddleware,
  proxy(`${process.env.NOTIFICATION_SERVICE_URL}/login`, {
    proxyReqPathResolver: (req) => {
      return "/login";
    },
  })
);
router.use(
  "/request",
  authMiddleware,
  proxy(`${process.env.NOTIFICATION_SERVICE_URL}/request`, {
    proxyReqPathResolver: (req) => {
      return "/request";
    },
  })
);
router.use(
  "/logout",
  authMiddleware,
  proxy(`${process.env.NOTIFICATION_SERVICE_URL}/logout`, {
    proxyReqPathResolver: (req) => {
      return "/logout";
    },
  })
);

module.exports = router;
