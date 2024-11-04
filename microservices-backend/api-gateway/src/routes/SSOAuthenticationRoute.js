// const express = require("express");
// const proxy = require("express-http-proxy");

// const router = express.Router();

// router.use("/login", proxy(`${process.env.SSO_AUTH_SERVICE_URL}/login`));

// module.exports = router;
const express = require("express");
const proxy = require("express-http-proxy");

const router = express.Router();

//PROXIES ARE BEING USED TO REDIRECT THE REQUEST MADE TO API-GATEWAY TOWARDS THE
//SSO-AUTH SERVICE
router.use(
  "/login",
  proxy(`${process.env.SSO_AUTH_SERVICE_URL}`, {
    proxyReqPathResolver: (req) => {
      return "/login";
    },
  })
);

module.exports = router;
