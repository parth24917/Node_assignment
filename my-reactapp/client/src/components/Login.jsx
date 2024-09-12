import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login',
        {
          method: 'POST',
          
          headers: { 'Content-Type': 'multipart/form-data' },
        body: JSON.stringify({ email, password }),
        }
        );

    //   console.log('Response:', response.data); // Log the response data
    //   localStorage.setItem('token', response.data.token);
    //   navigate('/dashboard');
    // } catch (error) {
    //   console.error('Error:', error); // Log the error
    //   alert('Invalid credentials');
    // }
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
      // Redirect or show success message
    } else {
      console.error('Login error:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }

  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
