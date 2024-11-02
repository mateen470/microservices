import styled from "@emotion/styled";
import React from "react";

const LoadingSpinner = ({ size }) => <Spinner size={size} />;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingSpinner;
