import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from '../src/components/SignUp.jsx'
import Login from '../src/components/Login.jsx';
import Dashboard from '../src/components/Dashboard.jsx';


const isAuthenticated = () => {
  return !!localStorage.getItem('token'); 
};

const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

       
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />

        
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
};

export default App;
