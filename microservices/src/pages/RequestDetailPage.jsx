import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserContext } from "../utilities/Context";
import back from "../assets/back.png";
import approved from "../assets/approved.png";
import pending from "../assets/pending.png";
import rejected from "../assets/rejected.png";
import Button from "../components/Button";

function RequestDetailPage() {
  // THE ID IS FETCHED FROM THE URL
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState("Pending");
  const { isAdmin } = useContext(UserContext);

  const apiGatewayUrl = process.env.REACT_APP_API_GATEWAY_URL;

  const handleStatusUpdate = async () => {
    setLoading(true);
    try {
      //THE BACKEND CALL IS MADE WITH ID OF CURRENTLY OPENED REQUEST IN THE
      //PAGE ALONG WITH NEW STATUS
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

      //NOTIFICATIONS ARE SENT AFTER STATUS UPDATE, TO BOTH
      //REQUESTOR AND SUPERIOR
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
      toast.success("STATUS UPDATED!!");
    } catch (error) {
      console.error("FAILED TO UPDATE REQUEST STATUS!!");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    //GET REQUEST DETAILS ON PAGE LOAD BASED ON ID FETCHED FROM URL
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
    <Container isAdmin={isAdmin}>
      <BackButton onClick={handleBack}>
        <BackIcon src={back} alt="back" />
      </BackButton>
      <Title>Request Details</Title>
      <Info>
        <InfoLabel>Title:</InfoLabel>
        <InfoContent>{request?.title}</InfoContent>
      </Info>
      <Info>
        <InfoLabel>Description:</InfoLabel>
        <DescriptionContent>{request?.description}</DescriptionContent>
      </Info>
      <Info>
        <InfoLabel>Type:</InfoLabel>
        <InfoContent>{request?.type}</InfoContent>
      </Info>
      <Info>
        <InfoLabel>Urgency:</InfoLabel>
        <InfoContent>{request?.urgency}</InfoContent>
      </Info>
      <Info>
        <InfoLabel>Superior Email:</InfoLabel>
        <InfoContent>{request?.superiorEmail}</InfoContent>
      </Info>
      <Info>
        <InfoLabel>Status:</InfoLabel>
        <StatusIcon
          src={
            request?.status === "Pending"
              ? pending
              : request?.status === "Approved"
              ? approved
              : rejected
          }
          alt="status"
        />
      </Info>
      {isAdmin && (
        <StatusUpdateContainer>
          <StatusSelect
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </StatusSelect>
          <Button
            name={"update"}
            onClick={handleStatusUpdate}
            loading={loading}
          />
        </StatusUpdateContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 50%;
  height: ${(props) => (props.isAdmin ? "58vh" : "50vh")};
  padding: 20px 40px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #eaeaf1;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  @media (max-width: 1000px) {
    width: 98%;
    height: 75vh;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  font-size: 1.8rem;
  font-weight: bold;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
`;

const Info = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
`;

const InfoLabel = styled.h3`
  font-weight: bold;
  color: #555;
  margin-right: 5px;
  white-space: nowrap;
`;

const InfoContent = styled.h3`
  font-weight: 300;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;

const DescriptionContent = styled.p`
  font-weight: 300;
  color: black;
  margin: 0;
  overflow-wrap: break-word;
  white-space: normal;
  max-height: 50px;
  overflow-y: auto;
`;

const StatusUpdateContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
`;

const StatusSelect = styled.select`
  padding: 8px 12px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  color: #333;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

const BackButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 18px;
  left: 30px;
`;

const StatusIcon = styled.img`
  height: 25px;
  width: 25px;
`;

const BackIcon = styled.img`
  width: 30px;
  height: 30px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default RequestDetailPage;
