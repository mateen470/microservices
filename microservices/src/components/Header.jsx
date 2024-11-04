import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { UserContext } from "../utilities/Context";
import styled from "@emotion/styled";
function Header() {
  //GETTING CONTEXT FROM CONTEXT API
  const { user, logoutUser, loginUser } = useContext(UserContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const apiGatewayUrl = process.env.REACT_APP_API_GATEWAY_URL;

  const handleLogout = async () => {
    setLoading(true);
    //GETTING JWT FROM LOCAL STORAGE TO SEND TO BACKEND FOR LOGOUT E-MAIL BEFORE LOGGIN-OUT
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
      //USING CONTEXT LOGOUT FUNCTION TO LOGOUT BY REMOVING JWT FROM LOCAL STORAGE
      logoutUser();
      navigate("/");
    } catch (error) {
      console.error("LOGOUT FAILED!! PLEASE TRY AGAIN!!");
    } finally {
      setLoading(false);
    }
  };

  //THIS HOOK CHECKS THAT IF THE USER LOGS-INTO THE APPLICATION AND TRIES TO OPEN THE APP
  //IN OTHER WEB-PAG AS WELL, IT WOULD AUTOMATICALLY DIRECT USER TO DASHBOARD, USER WON'T
  //HAVE TO LOGIN AGAIN AS HE IS ALREADY LOGGED-IN
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && !user) {
      loginUser(token);
      if (location.pathname === "/") {
        navigate("/dashboard");
      }
    }
  }, [navigate, location.pathname, user, loginUser]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {user && (
        <HeaderContainer>
          <UserAvatar onClick={toggleDropdown}>
            {user.name.charAt(0)}
          </UserAvatar>
          {dropdownOpen && (
            <Dropdown ref={dropdownRef}>
              <DropdownContent>
                <UserInfo>
                  <UserName>{user.name}</UserName>
                  <UserEmail>{user.email}</UserEmail>
                </UserInfo>
              </DropdownContent>
            </Dropdown>
          )}
          <Button name="logout" onClick={handleLogout} loading={loading} />
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
  position: relative;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 10px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 65px;
  left: 20px;
  background: #eaeaf1;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
`;

const DropdownContent = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const UserName = styled.h4`
  font-weight: 600;
  margin: 0;
  color: #333;
`;

const UserEmail = styled.p`
  margin: 2px 0 0;
  font-size: 0.9rem;
  color: #666;
`;

export default Header;
