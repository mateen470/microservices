import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

      toast.success(response.data.message);

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
      toast.error("LOGIN FAILED PLEASE TRY AGAIN!!");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginFailure = () => {
    toast.error("LOGIN FAILED!!");
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

export default Login;
