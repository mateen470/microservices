const transporter = require("../config/mailConfig");

const sendLoginNotification = async (req, res) => {
  const { email, name } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "SUCCESSFUL LOGIN!!",
    html: `
    <div style="font-family: Poppins, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 5px;">
      <h2 style="color: #4CAF50;">Guten Tag, ${name}!</h2>
      <p style="font-size: 16px;">You have successfully logged in!</p>
    </div>
  `,
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
    html: `
    <div style="font-family: Poppins, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 5px;">
      <h2 style="color: #4CAF50;">Guten Tag, ${name}!</h2>
      <p style="font-size: 16px;">You have successfully logged out!</p>
      <p style="font-size: 14px; color: #555;">We hope to see you back soon.</p>
    </div>
  `,
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
    html: `
      <div style="font-family: Poppins, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #4CAF50;">Request Submitted Successfully</h2>
        <p style="font-size: 16px;">You sent a request to <strong>${requestData.superiorEmail}</strong> for approval.</p>
        <p style="font-size: 14px; color: #555;">Request Details:</p>
        <pre style="background: #f8f8f8; padding: 10px; border-radius: 5px;"><p style="font-size: 14px; color: #555;">Request Title: <strong>${requestData.title}</strong></p>
        <p style="font-size: 14px; color: #555;">Description: ${requestData.description}</p></pre>
      </div>
    `,
  };

  const mailOptionsToSuperior = {
    from: process.env.EMAIL_USER,
    to: requestData.superiorEmail,
    subject: "NEW REQUEST SUBMITTED BY YOUR TEAM MEMBER!!",
    html: `
      <div style="font-family: Poppins, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #4CAF50;">New Team Member Request</h2>
        <p style="font-size: 16px;">A new request has been submitted by ${name} (<strong>${email}</strong>).</p>
        <p style="font-size: 14px; color: #555;">Request Details:</p>
        <pre style="background: #f8f8f8; padding: 10px; border-radius: 5px;"><p style="font-size: 14px; color: #555;">Request Title: <strong>${requestData.title}</strong></p>
        <p style="font-size: 14px; color: #555;">Description: ${requestData.description}</p></pre>
      </div>
    `,
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
    html: `
    <div style="font-family: Poppins, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 5px;">
      <h2 style="color: #4CAF50;">Request Status Update</h2>
      <p style="font-size: 16px;">The status of your request has been updated by <strong>${request.superiorEmail}</strong>.</p>
      <p style="font-size: 14px; color: #555;">Request Details:</p>
      <pre style="background: #f8f8f8; padding: 10px; border-radius: 5px;"><p style="font-size: 14px; color: #555;">Request Title: <strong>${request.title}</strong></p>
        <p style="font-size: 14px; color: #555;">Description: ${request.description}</p></pre>
    </div>
  `,
  };

  const mailOptionsToSuperior = {
    from: process.env.EMAIL_USER,
    to: request.superiorEmail,
    subject: "STATUS OF REQUEST HAS BEEN CHANGED!!",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #FF5722;">Request Status Changed</h2>
        <p style="font-size: 16px;">You updated the status of a request from <strong>${request.requestorName}</strong> (<strong>${request.requestorEmail}</strong>).</p>
        <p style="font-size: 14px; color: #555;">Request Details:</p>
        <pre style="background: #f8f8f8; padding: 10px; border-radius: 5px;"><p style="font-size: 14px; color: #555;">Request Title: <strong>${request.title}</strong></p>
        <p style="font-size: 14px; color: #555;">Description: ${request.description}</p></pre>
      </div>
    `,
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
