import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utilities/Context";
import view from "../assets/view.png";
import approved from "../assets/approved.png";
import pending from "../assets/pending.png";
import rejected from "../assets/rejected.png";
function RequestsContainer() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const { isAdmin } = useContext(UserContext);

  const apiGatewayUrl = process.env.REACT_APP_API_GATEWAY_URL;

  useEffect(() => {
    //WHEN THE PAGE LOADS, THIS FUNCTION AUTOMATICALLY FETCHES ALL THE CURRENT-USER
    //REQUESTS, OR IF THE ADMIN IS LOGGED-IN, IT WOULD FETCH ALL THE PENDING REQUESTS
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `${apiGatewayUrl}/requests/${
            isAdmin ? "get-pending-requests" : "get-user-requests"
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setRequests(response.data.requests);
      } catch (error) {
        console.error("FAILED TO GET REQUESTS!!");
      }
    };

    fetchRequests();
  }, [apiGatewayUrl, isAdmin]);

  const handleRowClick = (id) => {
    navigate(`/request-page/${id}`);
  };

  return (
    <Container>
      <Title>{isAdmin ? "Pending Requests" : "Your Requests"}</Title>
      <Table>
        <TableHeader>
          <HeaderCell>Title</HeaderCell>
          <HeaderCell>Status</HeaderCell>
          <HeaderCell>Action</HeaderCell>
        </TableHeader>
        <TableBody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <TableRow key={request._id}>
                <TableCell>{request.title}</TableCell>
                <TableCell>
                  <StatusIcon
                    src={
                      request.status === "Pending"
                        ? pending
                        : request.status === "Approved"
                        ? approved
                        : rejected
                    }
                    alt="status"
                  />
                </TableCell>
                <TableCell onClick={() => handleRowClick(request._id)}>
                  <ActionIcon src={view} alt="view" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="3" style={{ textAlign: "center" }}>
                No requests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  width: 50%;
  height: 50vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #eaeaf1;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media (max-width: 1000px) {
    width: 98%;
    height: 70vh;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  color: #333;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  height: 30vh;
  flex: 1;
`;

const TableHeader = styled.h3`
  display: flex;
  font-weight: bold;
  border-bottom: 2px solid #333;
  padding: 10px 0;
`;

const HeaderCell = styled.div`
  flex: 1;
  text-align: center;
`;

const TableBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  &:nth-of-type(even) {
    background-color: #f5f5fa;
  }
`;

const TableCell = styled.div`
  flex: 1;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;

const StatusIcon = styled.img`
  height: 25px;
  width: 25px;
`;

const ActionIcon = styled.img`
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

export default RequestsContainer;
