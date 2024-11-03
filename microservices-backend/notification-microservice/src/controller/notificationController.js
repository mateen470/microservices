const transporter = require("../config/mailConfig");

const sendLoginNotification = async (req, res) => {
  const { email, name } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "SUCCESSFUL LOGIN!!",
    text: `GUTEN TAG! ${name} YOU HAVE SUCCESSFULLY LOGGED-IN!!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};
const sendLogoutNotification = async (req, res) => {
  const { email, name } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "SUCCESSFUL LOGOUT!!",
    text: `GUTEN TAG! ${name} YOU HAVE SUCCESSFULLY LOGGED-OUT!!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};
const sendRequestNotification = async (req, res) => {
  const { email, name, requestData } = req.body;

  const mailOptionsToRequester = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "NEW REQUEST SUBMITTED!!",
    text: `YOU SENT A REQUEST TO ${requestData.superiorEmail} FOR APPROVAL. THE REQUEST DETAILS :: ${requestData}`,
  };

  const mailOptionsToSuperior = {
    from: process.env.EMAIL_USER,
    to: requestData.superiorEmail,
    subject: "NEW REQUEST SUBMITTED BY YOUR TEAM MEMBER!!",
    text: `A NEW REQUEST HAS BEEN SUBMITTED BY THE TEAM MEMBER ${name} WITH E-MAIL ${email}. APPROVE THE REQUEST BY VISITING THE DASHBOARD. THE REQUEST DATA :: ${requestData}`,
  };

  try {
    await transporter.sendMail(mailOptionsToRequester);
    await transporter.sendMail(mailOptionsToSuperior);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};
const sendRequestStatusChangeNotification = async (req, res) => {
  const { request } = req.body;

  const mailOptionsToRequester = {
    from: process.env.EMAIL_USER,
    to: request.requestorEmail,
    subject: "STATUS OF YOUR REQUEST HAS CHANGED!!",
    text: `STATUS OF YOUR REQUEST HAS BEEN CHANGED BY ${request.superiorEmail}. THE REQUEST DETAILS :: ${request}`,
  };

  const mailOptionsToSuperior = {
    from: process.env.EMAIL_USER,
    to: request.superiorEmail,
    subject: "STATUS OF REQUEST HAS BEEN CHANGED!!",
    text: `YOU CHANGED THE STATUS OF THE REQUEST SUBMITTED BY ${request.requestorName} WITH E-MAIL ${request.requestorEmail}. THE REQUEST DATA :: ${request}`,
  };

  try {
    await transporter.sendMail(mailOptionsToRequester);
    await transporter.sendMail(mailOptionsToSuperior);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};

module.exports = {
  sendLoginNotification,
  sendLogoutNotification,
  sendRequestNotification,
  sendRequestStatusChangeNotification,
};
