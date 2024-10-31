import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
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

  const apiGatewayUrl = process.env.REACT_APP_API_GATEWAY_URL;
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      const response = await axios.post(
        `${apiGatewayUrl}/auth`,
        {
          token: googleToken,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("here!!");


      const jwtToken = response.data.token;
      localStorage.setItem("jwtToken", jwtToken);

      toast.success("LOGIN SUCCESSFULL!!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error("LOGIN FAILED!!");
    }
  };

  const handleLoginFailure = () => {
    toast.error("LOGIN FAILED!!");
  };

  return (
    <LoginContainer>
      <ToastContainer />
      <GoogleOAuthProvider clientId={googleClientId}>
        <div>
          <h2>Welcome! Please log in.</h2>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </div>
      </GoogleOAuthProvider>
    </LoginContainer>
  );
}

export default Login;