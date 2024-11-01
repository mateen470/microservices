// const express = require("express");
// const proxy = require("express-http-proxy");

// const router = express.Router();

// router.use("/login", proxy(`${process.env.SSO_AUTH_SERVICE_URL}/login`));

// module.exports = router;
const express = require("express");
const proxy = require("express-http-proxy");

const router = express.Router();

router.use(
  "/login",
  proxy(`${process.env.SSO_AUTH_SERVICE_URL}/login`, {
    proxyReqPathResolver: (req) => {
      return "/login";
    },
  })
);

module.exports = router;
