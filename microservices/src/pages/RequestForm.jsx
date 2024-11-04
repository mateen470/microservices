import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import styled from "@emotion/styled";
import Button from "../components/Button";
import axios from "axios";
import back from "../assets/back.png";
function RequestForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Leave");
  const [urgency, setUrgency] = useState("");
  const [superiorEmail, setSuperiorEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    setLoading(true);

    try {
      //REQUEST IS CREATED BY SENDING THE INPUT FIELDS DATA TO BACKEND AND THEN
      //BACKEND WOULD SAVE THE REQUEST IN DB
      await axios.post(`${apiGatewayUrl}/requests/create`, requestData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      });

      //NOTIFICAION IS SENT TO SUPERIOR AND REQUESTOR EMAIL USING BACKEND API
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
      toast.success("REQUEST SENT!!");
    } catch (error) {
      console.error("AN ERROR OCCURRED IN CREATING THE REQUEST!!");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <FormContainer>
      <BackButton onClick={handleBack}>
        <BackIcon src={back} alt="back" />
      </BackButton>
      <FormTitle>Create a New Request</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Leave">Leave</option>
          <option value="Equipment">Equipment</option>
          <option value="Overtime">Overtime</option>
        </Select>
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
        <ButtonContainer>
          <Button name={"publish"} type={"submit"} loading={loading} />
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: 50%;
  height: 50vh;
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
  overflow: hidden;
  @media (max-width: 1000px) {
    width: 98%;
    height: 65vh;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  font-weight: bold;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  margin: 10px 0;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const BackButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 18px;
  left: 30px;
`;

const BackIcon = styled.img`
  width: 30px;
  height: 30px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default RequestForm;
