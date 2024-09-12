import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('/api/auth/profile', {
          headers: { Authorization: token },
        });
        setUser(response.data);
      } catch (error) {
        alert('Unauthorized');
        navigate('/login');
      }
    };
    
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return user ? (
    <div>
      <h2>Dashboard</h2>
      <img src={`/public/profile_images/${user.profileImage}`} alt="Profile" width="100" />
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Dashboard;
