import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "../components/Button";
import axios from "axios";
function RequestForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Leave");
  const [urgency, setUrgency] = useState("");
  const [superiorEmail, setSuperiorEmail] = useState("");

  const apiGatewayUrl = process.env.REACT_APP_API_GATEWAY_URL;
  const jwtToken = localStorage.getItem("jwtToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      title,
      description,
      type,
      urgency,
      superiorEmail,
    };

    try {
      await axios.post(`${apiGatewayUrl}/requests/create`, requestData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      });
      await axios.post(
        `${apiGatewayUrl}/notifications/request`,
        { requestData },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("AN ERROR OCCURRED IN CREATING THE REQUEST!!");
    }
  };

  return (
    <FormContainer>
      <h2>Create a New Request</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <Input
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Leave">Leave</option>
          <option value="Equipment">Equipment</option>
          <option value="Overtime">Overtime</option>
        </select>
        <Input
          type="text"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          placeholder="Urgency"
          required
        />
        <Input
          type="email"
          value={superiorEmail}
          onChange={(e) => setSuperiorEmail(e.target.value)}
          placeholder="Superior's Email"
          required
        />
        <Button type="submit">Submit Request</Button>
      </form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export default RequestForm;
