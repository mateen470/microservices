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
const getSpecificRequest = async (req, res) => {
  try {
    const request = await Request.find({ _id: req.params.id });
    res.status(200).json(request);
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};
const getPendingRequests = async (req, res) => {
  try {
    const pendingRequests = await Request.find({ status: "Pending" });
    res.status(200).json({ requests: pendingRequests });
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};
const updateRequestStatus = async (req, res) => {
  try {
    await Request.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};

module.exports = {
  createRequest,
  getUserRequests,
  getSpecificRequest,
  getPendingRequests,
  updateRequestStatus,
};
