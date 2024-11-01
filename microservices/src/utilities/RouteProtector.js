import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const RouteProtector = () => {
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
