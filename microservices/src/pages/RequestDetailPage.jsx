import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { UserContext } from "../utilities/Context";

function RequestDetailPage() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [newStatus, setNewStatus] = useState("Pending");
  const { isAdmin } = useContext(UserContext);

  const apiGatewayUrl = process.env.REACT_APP_API_GATEWAY_URL;

  const handleStatusUpdate = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      await axios.put(
        `${apiGatewayUrl}/requests/update-specific-request/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRequest((prevRequest) => ({ ...prevRequest, status: newStatus }));
      await axios.post(
        `${apiGatewayUrl}/notifications/request-status`,
        { request },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("FAILED TO UPDATE REQUEST STATUS!!");
    }
  };

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `${apiGatewayUrl}/requests/get-specific-request/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setRequest(...response.data);
      } catch (error) {
        console.error("FAILED TO GET REQUEST DETAILS!!");
      }
    };

    fetchRequest();
  }, [apiGatewayUrl, id]);

  return (
    <Container>
      <Title>Request Details</Title>
      <Info>
        <strong>Title:</strong> {request?.title}
      </Info>
      <Info>
        <strong>Description:</strong> {request?.description}
      </Info>
      <Info>
        <strong>Type:</strong> {request?.type}
      </Info>
      <Info>
        <strong>Urgency:</strong> {request?.urgency}
      </Info>
      <Info>
        <strong>Superior Email:</strong> {request?.superiorEmail}
      </Info>
      <Info>
        <strong>Status:</strong> {request?.status}
      </Info>
      {isAdmin && (
        <StatusUpdateContainer>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button onClick={handleStatusUpdate}>Update Status</button>
        </StatusUpdateContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Info = styled.p`
  margin: 10px 0;
  line-height: 1.5;
  word-wrap: break-word;
`;
const StatusUpdateContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default RequestDetailPage;
