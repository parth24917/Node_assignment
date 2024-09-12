import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Create FormData to send the data, including the image
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(response.data.message); // Show success message
    } catch (error) {
      alert('Error signing up');
    }
  };

  return (
    <form onSubmit={handleSignUp} encType="multipart/form-data">
      <h2>Sign Up</h2>
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
      <input 
        type="file" 
        onChange={(e) => setProfileImage(e.target.files[0])} 
        required 
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
