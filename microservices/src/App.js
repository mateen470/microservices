import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RequestForm from "./pages/RequestForm";
import RequestDetailPage from "./pages/RequestDetailPage";
import Header from "./components/Header";
import { RouteProtector } from "./utilities/RouteProtector";
import { UserProvider } from "./utilities/Context";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
      <Router>
        <Toaster position="top-right" />
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<RouteProtector />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/request" element={<RequestForm />} />
            <Route path="/request-page/:id" element={<RequestDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
