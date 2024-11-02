import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function RequestsContainer() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const apiGatewayUrl = process.env.REACT_APP_API_GATEWAY_URL;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `${apiGatewayUrl}/requests/get-user-requests`,
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
  }, [apiGatewayUrl]);

  const handleRowClick = (id) => {
    navigate(`/request-page/${id}`);
  };

  return (
    <Container>
      <h2>Your Requests</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>Title</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader></TableHeader>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <TableRow key={request._id}>
                <TableCell>{request.title}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell
                  onClick={() => handleRowClick(request._id)}
                  style={{ cursor: "pointer" }}
                >
                  View
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="2" style={{ textAlign: "center" }}>
                No requests found.
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #333;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export default RequestsContainer;
