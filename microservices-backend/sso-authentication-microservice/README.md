SSO Authentication Microservice

The SSO Authentication Microservice handles Single Sign-On (SSO) authentication via Google OAuth. It verifies the Google token from the frontend and generates a JWT token for authorization across the application.

Table of Contents
Overview
Prerequisites
Installation
Environment Variables
Project Structure
Routes
Authentication Flow
Starting the Application
Testing

Overview
This microservice verifies Google tokens and generates JSON Web Tokens (JWT) for user authentication. It uses the Google OAuth client to authenticate users and the jsonwebtoken library to issue tokens.

Prerequisites
Node.js (v14 or higher)
Google OAuth Client ID (available from the Google Developer Console)
Express for server setup and routing

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/mateen470/microservices.git
cd your-repo/sso-auth-microservice

Install dependencies:

bash
Copy code
yarn install

Set up environment variables (see Environment Variables section).

Environment Variables
Create a .env file in the root directory and add the following:

env
Copy code
PORT=4001
JWT_SECRET=your-jwt-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
PORT: Port for the authentication microservice (default: 4001).
JWT_SECRET: Secret key for signing JWT tokens.
GOOGLE_CLIENT_ID: OAuth Client ID from the Google Developer Console.

Project Structure
The main files and folders in the src directory:

server.js: Initializes the server, sets up routes, and listens on the specified port.
config/: Contains configuration files.
googleAuthClient.js: Initializes and exports the Google OAuth2 client for authentication.
controller/: Contains controller functions with business logic for authentication.
authController.js: Verifies the Google token and generates a JWT.
routes/: Contains route definitions.
authRoutes.js: Defines the endpoint for user login via Google.

Routes
The routes in authRoutes.js define the endpoints for the SSO Authentication Microservice.

Method Endpoint Description
POST /login Authenticates the user and generates a JWT token

Example: Route Setup
javascript
Copy code
const express = require("express");
const { googleLogin } = require("../controller/authController");

const router = express.Router();

router.post("/login", googleLogin);

module.exports = router;

Authentication Flow

1. Frontend Login
   The user clicks the "Login with Google" button on the frontend, which sends a Google OAuth token to this microservice.
2. Verifying Google Token
   The googleLogin function in authController.js verifies the Google token using the google-auth-library OAuth2 client. It checks the token’s authenticity and retrieves the user's Google profile data.
3. Generating JWT
   After verifying the Google token, a JWT is generated using the jsonwebtoken library. The JWT payload includes:
   userId: User's unique Google ID (sub).
   email: User’s email address.
   name: User's name.
   picture: Profile picture URL.
   The JWT is sent back to the frontend, where it’s used for authentication and authorization throughout the app.
   Example: JWT Generation
   javascript
   Copy code
   const jwtToken = jwt.sign(
   { userId: sub, email, name, picture },
   process.env.JWT_SECRET,
   { expiresIn: "1h" }
   );

Starting the Application
To start the SSO Authentication Microservice:

bash
Copy code
yarn start

The server will start on the specified PORT (default: 4001). You should see SSO AUTHENTICATION SERVICE RUNNING SUCCESSFULLY!! ON PORT :: 4001 in the console.

Testing
Google OAuth Flow: Use Postman or frontend code to send a valid Google OAuth token to the /login endpoint.
JWT Validation: Ensure that the response includes a valid JWT by decoding it with a tool like jwt.io.

Example: Controller Logic
The following function in authController.js verifies the Google token and generates the JWT.

javascript
Copy code
exports.googleLogin = async (req, res) => {
const { token } = req.body;

try {
const ticket = await client.verifyIdToken({
idToken: token,
audience: process.env.GOOGLE_CLIENT_ID,
});

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    const jwtToken = jwt.sign(
      { userId: sub, email, name, picture },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: jwtToken });

} catch (error) {
res.status(401).send(error.message || error);
}
};
