const express = require("express");
const proxy = require("express-http-proxy");
const authMiddleware = require("../middleware/authenticationMiddleware");

const router = express.Router();

//PROXIES ARE BEING USED TO REDIRECT THE REQUEST MADE TO API-GATEWAY TOWARDS THE
//NOTIFICATION SERVICE
router.use(
  "/login",
  authMiddleware,
  proxy(`${process.env.NOTIFICATION_SERVICE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/login";
    },
  })
);
router.use(
  "/request",
  authMiddleware,
  proxy(`${process.env.NOTIFICATION_SERVICE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/request";
    },
  })
);
router.use(
  "/request-status",
  authMiddleware,
  proxy(`${process.env.NOTIFICATION_SERVICE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/request-status";
    },
  })
);
router.use(
  "/logout",
  authMiddleware,
  proxy(`${process.env.NOTIFICATION_SERVICE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/logout";
    },
  })
);

module.exports = router;
