import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import VerifyOtp from "./components/verify_otp";
import ResetPass from "./components/resetpass";
import Layout from "./components/layout"

// For protected Route to layout uncomment it 

import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    
    <Router>
      <Routes>
        /* <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<VerifyOtp flow="forgotPassword" />} />     
        <Route path="/verify-account" element={<VerifyOtp flow="verifyAccount" />} />                    
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPass />} /> */
        {/* <Route path="/Layout" element={<Layout />} /> */}
        <Route path="/layout" element={<PrivateRoute><Layout /></PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
