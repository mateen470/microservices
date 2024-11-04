Project Name - microservices
Overview
This is the frontend application for the project, built with React. It provides user authentication through Google OAuth, request management, and a role-based dashboard (user and admin views). The application uses React Router for navigation and axios for API communication, with JWT authentication for secure access.

Prerequisites
Node.js (v14 or above)
yarn for package management

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo.git
cd your-repo

Install dependencies:

bash
Copy code
yarn install
Environment Variables: Create a .env file in the root directory and add the following variables:

env
Copy code
REACT_APP_API_GATEWAY_URL=http://localhost:4000
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_ADMIN_ID=your-admin-email@example.com

Folder Structure

src/ - Main application source code
components/ - Reusable components such as Button, Header, and LoadingSpinner
pages/ - Each route's main components like Dashboard, Login, RequestForm, and RequestDetailPage
utilities/ - Helper functions and Context API files such as Context.js, Interceptor.js, and RouteProtector.js
App.js - Main application component with routing setup
index.js - Entry point of the application
Running the Application

To start the development server:

bash
Copy code
yarn start

To build the application for production:

bash
Copy code
yarn build

Core Functionalities and Components
Authentication
Login with Google OAuth:
The Login component uses react-oauth/google for Google OAuth.
Successful login saves a JWT in localStorage, which is used for API requests.
Dashboard and Role-Based Access
User Dashboard: Displays the user's own requests.
Admin Dashboard: Displays all pending requests for admins.
Route Protection: The RouteProtector utility restricts access to routes, checking for a valid JWT.
Header: The header includes a user avatar, a dropdown with user info, and a logout button.
Components
Button: Displays different icons based on the button type (logout, publish, request, update) and supports a loading spinner.
RequestsContainer: Fetches and displays user or admin requests in a scrollable table format.
RequestForm: Form for creating new requests with fields for title, description, type, urgency, and superior email.
RequestDetailPage: Displays details of a specific request and allows the admin to update the request status.

API Communication and Interceptors
Axios Interceptors: In Interceptor.js, intercepts outgoing requests to:

Add JWT to headers.
Check for token expiration and redirect to login if expired.

Environment Variables:

REACT_APP_API_GATEWAY_URL: The API gateway URL for backend calls.
REACT_APP_GOOGLE_CLIENT_ID: Google Client ID for OAuth.
REACT_APP_ADMIN_ID: Email of the designated admin.

Notifications
Email Notifications: Email notifications are triggered for login, request creation, and request status updates.

Development Workflow
Code Standards
Use camelCase for variable and function names.
Follow the Airbnb JavaScript Style Guide for consistent code formatting.

Testing
Manual Testing: The application relies on manual testing in the development environment.

Troubleshooting
Session Expiration: If the session expires, the application will prompt the user to re-login via an interceptor check.

Login Issues: Ensure the Google Client ID and API Gateway URL are correct in the .env file if Google OAuth fails.
