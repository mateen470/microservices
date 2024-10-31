import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "../components/Button";

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

function RequestForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Leave");
  const [urgency, setUrgency] = useState("");
  const [superiorEmail, setSuperiorEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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

export default RequestForm;
