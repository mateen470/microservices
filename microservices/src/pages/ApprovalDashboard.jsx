import React from "react";
import styled from "@emotion/styled";
import Button from "../components/Button";
function ApprovalDashboard() {
  const requests = [
    {
      id: 1,
      title: "Leave Request",
      description: "Request for leave approval",
    },
  ];

  return (
    <ApprovalContainer>
      <h2>Approval Dashboard</h2>
      {requests.map((request) => (
        <div key={request.id}>
          <h3>{request.title}</h3>
          <p>{request.description}</p>
          <Button>Approve</Button>
          <Button>Reject</Button>
        </div>
      ))}
    </ApprovalContainer>
  );
}

const ApprovalContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export default ApprovalDashboard;
