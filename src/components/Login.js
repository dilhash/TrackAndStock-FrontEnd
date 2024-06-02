import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Auth.css'; // Assuming you have a CSS file for styling

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const user = await authService.login(email, password);
      setUser(user);
      navigate('/');
    } catch (error) {
      const apiMessage = error.response?.data?.message || 'Login failed';
      setErrorMessage(apiMessage);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        <button type="submit" className="auth-button">Login</button>
        <div className="auth-footer">
          <p>Don't have an account? <a href="/register">Create an account</a></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
