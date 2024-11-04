import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const RouteProtector = () => {
  //THIS IS A ROUTE PROTECTOR THAT CHECKS FOR JWT, IF JWT IS AVAILABLE
  //THEN IT MEANS THE USER IS VALID
  const token = localStorage.getItem("jwtToken");
  if (token) {
    try {
      jwtDecode(token);
      return <Outlet />;
    } catch (error) {
      localStorage.removeItem("jwtToken");
    }
  }
  return <Navigate to="/" />;
};
