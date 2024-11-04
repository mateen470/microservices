import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { UserContext } from "../utilities/Context";
import RequestsContainer from "../components/RequestsContainer";
import Button from "../components/Button";
function Dashboard() {
  const { isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/request");
  };

  return (
    <DashboardContainer>
      {isAdmin ? (
        ""
      ) : (
        <DashboardButton>
          <Button name={"request"} onClick={handleClick} />
        </DashboardButton>
      )}
      <RequestsContainer />
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DashboardButton = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default Dashboard;
