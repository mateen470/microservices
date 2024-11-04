const express = require("express");
const proxy = require("express-http-proxy");
const authMiddleware = require("../middleware/authenticationMiddleware");

const router = express.Router();

//PROXIES ARE BEING USED TO REDIRECT THE REQUEST MADE TO API-GATEWAY TOWARDS THE
//REQUEST SERVICE
router.use(
  "/create",
  authMiddleware,
  proxy(`${process.env.REQUEST_SERVICE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/create";
    },
  })
);
router.use(
  "/get-user-requests",
  authMiddleware,
  proxy(`${process.env.REQUEST_SERVICE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/get-user-requests";
    },
  })
);
router.use(
  "/get-specific-request/:id",
  authMiddleware,
  proxy(`${process.env.REQUEST_SERVICE_URL}`, {
    proxyReqPathResolver: (req) => {
      return `/get-specific-request/${req.params.id}`;
    },
  })
);
router.use(
  "/get-pending-requests",
  authMiddleware,
  proxy(`${process.env.REQUEST_SERVICE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/get-pending-requests";
    },
  })
);
router.use(
  "/update-specific-request/:id",
  authMiddleware,
  proxy(`${process.env.REQUEST_SERVICE_URL}`, {
    proxyReqPathResolver: (req) => {
      return `/update-specific-request/${req.params.id}`;
    },
  })
);

module.exports = router;
