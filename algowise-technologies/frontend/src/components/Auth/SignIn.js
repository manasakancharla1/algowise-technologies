import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import axios from 'axios';
import './SignIn.css'; // Import the CSS file

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use navigate instead of history

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/signin', formData);
      setMessage(response.data.message);

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({ username: response.data.username }));

      // Redirect to home page with username
      navigate(`/home/${response.data.username}`);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred during sign in');
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form">
        <h1>Sign In</h1>
        {message && <p className={message.includes('successfully') ? 'success' : 'error'}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Sign In</button>
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
