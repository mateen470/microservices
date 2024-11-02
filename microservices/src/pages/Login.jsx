import React, { useState, useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utilities/Context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import styled from "@emotion/styled";
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(UserContext);

  const apiGatewayUrl = process.env.REACT_APP_API_GATEWAY_URL;
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const googleToken = credentialResponse.credential;
      const response = await axios.post(
        `${apiGatewayUrl}/auth/login`,
        {
          token: googleToken,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const jwtToken = response.data.token;
      localStorage.setItem("jwtToken", jwtToken);

      const decoded = jwtDecode(jwtToken);
      dispatch({
        type: "SET_USER",
        payload: { name: decoded.name, email: decoded.email },
      });

      const adminEmail = process.env.REACT_APP_ADMIN_ID;
      if (decoded.email === adminEmail) {
        dispatch({ type: "SET_ADMIN", payload: true });
      }

      await axios.post(
        `${apiGatewayUrl}/notifications/login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginFailure = () => {
    console.error("LOGIN FAILED PLEASE TRY AGAIN!!");
  };

  return (
    <LoginContainer>
      <GoogleOAuthProvider clientId={googleClientId}>
        {loading ? (
          <LoadingSpinner size={"10vh"} />
        ) : (
          <div>
            <h2>Welcome! Please log in.</h2>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          </div>
        )}
      </GoogleOAuthProvider>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

export default Login;
