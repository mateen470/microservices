import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import RequestsContainer from "../components/RequestsContainer";
function Dashboard() {
  return (
    <DashboardContainer>
      <h2>Dashboard</h2>
      <DashboardButton to="/request">Create New Request</DashboardButton>
      <RequestsContainer />
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const DashboardButton = styled(Link)`
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
`;

export default Dashboard;
