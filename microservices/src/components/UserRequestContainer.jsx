import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
`;

function UserRequestContainer() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  const handleReadMore = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  return (
    <Container>
      <h2>Your Requests</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>Title</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Urgency</TableHeader>
            <TableHeader>Superior Email</TableHeader>
            <TableHeader>Status</TableHeader>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <TableRow key={request._id}>
                <TableCell>{request.title}</TableCell>
                <TableCell>
                  {request.description.length > 20
                    ? `${request.description.substring(0, 8)}...`
                    : request.description}
                  {request.description.length > 20 && (
                    <button onClick={() => handleReadMore(request)}>
                      Read More
                    </button>
                  )}
                </TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell>{request.urgency}</TableCell>
                <TableCell>{request.superiorEmail}</TableCell>
                <TableCell>{request.status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6" style={{ textAlign: "center" }}>
                No requests found.
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>

      {selectedRequest && (
        <Modal onClick={handleCloseModal}>
          <ModalContent>
            <h3>{selectedRequest.title}</h3>
            <p>{selectedRequest.description}</p>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

export default UserRequestContainer;
