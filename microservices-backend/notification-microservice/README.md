Notification Microservice

The Notification Microservice is responsible for sending email notifications to users for various actions, such as login, logout, request submission, and status updates. This service uses Nodemailer to send emails and works with an SMTP server for email transport.

Table of Contents
Overview
Prerequisites
Installation
Environment Variables
Project Structure
Routes
Email Notifications
Starting the Application
Testing

Overview
This service listens on a specified port and uses express.js to handle incoming requests. 

It sends emails for the following events:


Login Notification: Notifies the user upon successful login.
Logout Notification: Notifies the user upon logout.
Request Submission Notification: Notifies both the requester and the request’s superior when a new request is submitted.
Request Status Update Notification: Notifies both the requester and superior when the status of a request is updated.

Prerequisites
Node.js (v14 or higher)
Express for routing
Nodemailer for email handling

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/mateen470/microservices.git
cd your-repo/notification-microservice

Install dependencies:

bash
Copy code
yarn install

Set up environment variables (see Environment Variables section).

Environment Variables
Create a .env file in the root directory and add the following:

env
Copy code
PORT=4003
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-app-password
PORT: Port for the notification microservice (default: 4003).
EMAIL_USER: The email address from which notifications will be sent.
EMAIL_PASS: The app-specific password for the email account.
Note: Ensure that EMAIL_USER and EMAIL_PASS are set up correctly with the SMTP provider (in this case, Gmail). For Gmail, you may need to enable "Less Secure App Access" or use an App Password if using two-factor authentication.

Project Structure
The main files and folders in the src directory:

server.js: Initializes the server, sets up routes, and listens on the specified port.
config/: Contains configuration files.
mailConfig.js: Sets up Nodemailer to use Gmail for sending emails.
controller/: Contains controller files with logic for handling each notification type.
notificationController.js: Handles the creation and sending of emails for login, logout, request creation, and request status updates.
routes/: Contains route definitions for each notification endpoint.
notificationRoute.js: Defines endpoints for each notification type.

Routes
The routes in notificationRoute.js handle requests from other services to send email notifications. Here’s a breakdown of each route:

Login Notification: /login
Sends a login notification email to the user.
Logout Notification: /logout
Sends a logout notification email to the user.
Request Submission Notification: /request
Sends an email to the requester and the superior about the new request submission.
Request Status Update Notification: /request-status
Sends an email to the requester and superior with the updated status of the request

Example: Notification Route Setup
Each route uses a dedicated controller function to send notifications.

javascript
Copy code
const express = require("express");
const { 
  sendLoginNotification,
  sendLogoutNotification,
  sendRequestNotification,
  sendRequestStatusChangeNotification 
} = require("../controller/notificationController");

const router = express.Router();

router.post("/login", sendLoginNotification);
router.post("/logout", sendLogoutNotification);
router.post("/request", sendRequestNotification);
router.post("/request-status", sendRequestStatusChangeNotification);

module.exports = router;

Email Notifications
This service uses Nodemailer with a Gmail SMTP server to send notifications. Emails are formatted with HTML for a better user experience.

Notification Controller Breakdown
sendLoginNotification: Notifies the user of a successful login.
sendLogoutNotification: Notifies the user of a successful logout.
sendRequestNotification: Notifies the requester and superior when a new request is submitted.
sendRequestStatusChangeNotification: Notifies both the requester and superior when the status of a request is changed.

Example: Login Notification Controller
javascript
Copy code
const sendLoginNotification = async (req, res) => {
  const { email, name } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "SUCCESSFUL LOGIN!!",
    html: `
      <div style="font-family: Poppins, sans-serif; color: #333; padding: 20px;">
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

Starting the Application
To start the Notification Microservice:

bash
Copy code
yarn start

The server will start on the specified PORT (default: 4003).
You should see NOTIFICATION SERVICE RUNNING SUCCESSFULLY!! ON PORT :: 4003 in the console.

Testing
Endpoints: You can use a tool like Postman to test each notification endpoint by sending a POST request with the required fields (e.g., email, name, requestData).

Email Delivery: Verify that emails are being delivered as expected. You may need to check the spam folder for test emails during initial testing.
