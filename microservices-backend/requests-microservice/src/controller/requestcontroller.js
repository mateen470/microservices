const jwt = require("jsonwebtoken");
const Request = require("../model/schema");

const createRequest = async (req, res) => {
  try {
    const { title, description, type, urgency, superiorEmail, email, name } =
      req.body;

    let requestorEmail = email;
    let requestorName = name;

    const newRequest = new Request({
      title,
      description,
      type,
      urgency,
      superiorEmail,
      requestorEmail,
      requestorName,
    });

    await newRequest.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};
const getUserRequests = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userRequests = await Request.find({ requestorEmail: decoded.email });
    res.status(200).json({ requests: userRequests });
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};

module.exports = { createRequest, getUserRequests };
