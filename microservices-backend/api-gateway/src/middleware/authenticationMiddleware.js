const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).send();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body = {
      ...req.body,
      email: decoded.email,
      name: decoded.name,
    };
    next();
  } catch (error) {
    res.status(400).send(error.message || error);
  }
};
