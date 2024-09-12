import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from '../src/components/SignUp.jsx'
import Login from '../src/components/Login.jsx';
import Dashboard from '../src/components/Dashboard.jsx';

// Helper function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // JWT token stored in localStorage
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
};

export default App;
