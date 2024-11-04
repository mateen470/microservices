import React, { useState, useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utilities/Context";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import styled from "@emotion/styled";
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(UserContext);

  const apiGatewayUrl = process.env.REACT_APP_API_GATEWAY_URL;
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      //BASED ON CLIENT_ID, A GOOGLE TOKEN IS PROVIDED TO API-CALL FOR VERIFICATION
      //OF THAT GOOGLE TOKEN AND THEN BACKEND WOULD PROVIDE A JWT IN RETURN
      const googleToken = credentialResponse.credential;
      const response = await axios.post(
        `${apiGatewayUrl}/auth/login`,
        {
          token: googleToken,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const jwtToken = response.data.token;
     
      //AFTER RECIEVING THE JWT FROM BACKEND, IT IS SENT TO
      //CONTEXT FUNCTION OF LOGIN USER O DECODE THE JWT TO GET EMAIL
      //AND NAME OF CURRENT USER
      loginUser(jwtToken);

      // AFTER LOGIN, NOTIFICATION IS SENT TO THE USER EMAIL
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
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            type="icon"
            size="large"
            shape="pill"
            theme="filled_black"
          />
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
