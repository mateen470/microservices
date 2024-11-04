API Gateway
The API Gateway serves as a centralized entry point for all client requests, managing routing and authentication for three main microservices: SSO Authentication Service, Request Service, and Notification Service. It verifies JWT tokens, authenticates requests, and redirects them to appropriate microservices using proxy middleware.

Table of Contents
Overview
Prerequisites
Installation
Environment Variables
Project Structure
Routing and Proxies
Middleware
Starting the Application

Overview
The API Gateway acts as a single access point for requests, performing:

Authentication: Validates JWT tokens with middleware to ensure secure access.
Request Routing: Directs incoming requests to appropriate microservices using express proxies.
CORS and Logging: Uses cors for cross-origin requests and morgan for request logging.

Prerequisites
Node.js (v14 or higher)
Express framework
Yarn or npm for package management

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo.git
cd your-repo/api-gateway

Install dependencies:

bash
Copy code
yarn install

Set up environment variables (see Environment Variables section).

Environment Variables
Create a .env file in the root directory and add the following:

env
Copy code
PORT=4000
JWT_SECRET=your_jwt_secret_key
SSO_AUTH_SERVICE_URL=http://localhost:4001
REQUEST_SERVICE_URL=http://localhost:4002
NOTIFICATION_SERVICE_URL=http://localhost:4003
PORT: Port for the API Gateway (default: 4000).
JWT_SECRET: Secret key for JWT verification.

SSO_AUTH_SERVICE_URL: Base URL for the SSO Authentication microservice.
REQUEST_SERVICE_URL: Base URL for the Request microservice.
NOTIFICATION_SERVICE_URL: Base URL for the Notification microservice.

Project Structure
The main files and folders in the src directory:

server.js: Sets up the server, configures middlewares, and defines routes.
middleware/: Contains the JWT authentication middleware.
authenticationMiddleware.js: Validates JWT tokens and attaches decoded user information to requests.
routes/: Defines proxy routes to redirect requests to microservices.
SSOAuthenticationRoute.js: Routes requests to the SSO Authentication microservice.
requestRoute.js: Routes requests to the Request microservice.
notificationRoute.js: Routes requests to the Notification microservice.
Routing and Proxies

The API Gateway uses express HTTP proxies to route client requests to relevant microservices. Each route file in the routes directory uses express-http-proxy to forward requests.

Routes Overview
SSO Authentication Service (/auth):

Login: /auth/login — Redirects login requests to the SSO Authentication microservice.
Request Service (/requests):

Create Request: /requests/create — Forwards request creation to the Request Service.
User Requests: /requests/get-user-requests — Retrieves requests for the logged-in user.
Specific Request: /requests/get-specific-request/:id — Fetches details of a specific request.
Pending Requests: /requests/get-pending-requests — Retrieves pending requests (admin only).
Update Request: /requests/update-specific-request/:id — Updates request status.
Notification Service (/notifications):

Login Notification: /notifications/login — Sends login notifications.
Request Notification: /notifications/request — Notifies users and superiors about a new request.
Request Status Notification: /notifications/request-status — Notifies users of request status changes.
Logout Notification: /notifications/logout — Sends a logout notification to the user.
Middleware

The authentication middleware verifies the JWT token in each request:

Extracts the JWT from the Authorization header.
Verifies the token with the secret (JWT_SECRET).
Attaches the decoded user information (email, name) to req.body for further processing by downstream services.
This middleware is applied to routes requiring authenticated access to ensure only verified users can access certain routes.

Example: Authentication Middleware
javascript
Copy code
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
const token = req.headers.authorization?.split(" ")[1];

if (!token) return res.status(401).send();

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.body = { ...req.body, email: decoded.email, name: decoded.name };
next();
} catch (error) {
res.status(400).send(error.message || error);
}
};

Starting the Application
To start the API Gateway:

bash
Copy code
yarn start

The server will start on the specified PORT (default: 4000).
You should see API GATEWAY RUNNING SUCCESSFULLY!! ON PORT :: 4000 in the console.
Testing

JWT Verification: Ensure that the JWT token is valid before making requests that require authentication.

Proxy Routing: Test each route to verify that it correctly redirects to the corresponding microservice.
