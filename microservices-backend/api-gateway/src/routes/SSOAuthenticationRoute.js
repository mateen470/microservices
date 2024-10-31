const express = require("express");
const proxy = require("express-http-proxy");

const router = express.Router();

router.use(
  "/",
  proxy(process.env.SSO_AUTH_SERVICE_URL, {
    userResDecorator: (proxyRes, proxyResData, req, res) => {
      if (proxyRes.statusCode === 200) {
        req.headers.authorization = `Bearer ${JSON.parse(proxyResData).token}`;
        proxy(process.env.NOTIFICATION_SERVICE_URL)(req, res);
      }
    },
  })
);

module.exports = router;
