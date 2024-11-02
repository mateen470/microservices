import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { UserContext } from "../utilities/Context";
import styled from "@emotion/styled";
function Header() {
  const { user, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const apiGatewayUrl = process.env.REACT_APP_API_GATEWAY_URL;

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        await axios.post(
          `${apiGatewayUrl}/notifications/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      localStorage.removeItem("jwtToken");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error) {
      console.error("LOGOUT FAILED!! PLEASE TRY AGAIN!!");
    }
  };

  useEffect(() => {
    if (user !== null && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate, location.pathname, user]);

  return (
    <>
      {user && (
        <HeaderContainer>
          <UserInfo>
            <span>{user.name}</span>
            <span>{user.email}</span>
          </UserInfo>
          <Button onClick={handleLogout}>Logout</Button>
        </HeaderContainer>
      )}
    </>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Header;
