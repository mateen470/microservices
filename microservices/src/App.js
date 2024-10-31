import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RequestForm from "./pages/RequestForm";
import ApprovalDashboard from "./pages/ApprovalDashboard";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request" element={<RequestForm />} />
        <Route path="/approvals" element={<ApprovalDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
