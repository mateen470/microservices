import React, { useState } from "react";
import styled from "@emotion/styled";
import LoadingSpinner from "./LoadingSpinner";
import logout_black from "../assets/logout-black.png";
import logout_white from "../assets/logout-white.png";
import publish_white from "../assets/publish-white.png";
import create_white from "../assets/create-white.png";
import publish_black from "../assets/publish-black.png";
import create_black from "../assets/create-black.png";
import update_black from "../assets/update-black.png";
import update_white from "../assets/update-white.png";

const Button = ({ onClick, type, name, loading }) => {
  const [isHovered, setIsHovered] = useState(false);

  //MANAGING IMAGE SOURCE DEPEINDING ON PROPS
  const getImageSrc = () => {
    if (name === "logout") return isHovered ? logout_black : logout_white;
    if (name === "publish") return isHovered ? publish_black : publish_white;
    if (name === "request") return isHovered ? create_black : create_white;
    if (name === "update") return isHovered ? update_black : update_white;
    return logout_white;
  };

  return (
    <StyledButton
      onClick={onClick}
      type={type}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading ? (
        <LoadingSpinner size="25px" color="black" />
      ) : (
        <img
          src={getImageSrc()}
          alt={name}
          style={{
            height: "30px",
            width: "30px",
          }}
        />
      )}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  cursor: pointer;
  background: #f5f5fa;
  border: none;
  outline: none;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Button;
