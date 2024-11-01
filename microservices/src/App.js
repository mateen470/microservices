import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalStyles from "./styles/GlobalStyles";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RequestForm from "./pages/RequestForm";
import ApprovalDashboard from "./pages/ApprovalDashboard";
import Header from "./components/Header";
import { RouteProtector } from "./utilities/RouteProtector";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RouteProtector />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request" element={<RequestForm />} />
          <Route path="/approvals" element={<ApprovalDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
