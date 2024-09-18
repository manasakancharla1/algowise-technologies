import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    location: ''
  });

  const [message, setMessage] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAgreed) {
      setMessage('You must agree to the terms and conditions');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred during sign up');
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-form">
        <h1>Sign Up</h1>
        {message && <p className={message.includes('successfully') ? 'success' : 'error'}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
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
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={handleCheckboxChange}
            />
            I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">terms and conditions</a>
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
