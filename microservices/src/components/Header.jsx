import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import { toast } from "react-toastify";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import styled from "@emotion/styled";

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

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const apiGatewayUrl = process.env.REACT_APP_API_GATEWAY_URL;
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

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
        setUserName("");
        setUserEmail("");
        toast.success("LOGOUT SUCCESSFUL!!");
      }
      localStorage.removeItem("jwtToken");
      navigate("/");
    } catch (error) {
      console.error("LOGOUT FAILED!! PLEASE TRY AGAIN!!");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name);
        setUserEmail(decoded.email);
        if (location.pathname === "/") {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log("INVALID TOKEN!!");
      }
    }
  }, [navigate, location.pathname]);

  return (
    <>
      {userEmail && (
        <HeaderContainer>
          <UserInfo>
            <span>{userName}</span>
            <span>{userEmail}</span>
          </UserInfo>
          <Button onClick={handleLogout}>Logout</Button>
        </HeaderContainer>
      )}
    </>
  );
}

export default Header;
