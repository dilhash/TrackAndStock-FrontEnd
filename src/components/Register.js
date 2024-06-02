import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Auth.css'; // Assuming you have a CSS file for styling

const states = {
  'NSW': 'New South Wales',
  'VIC': 'Victoria',
  'QLD': 'Queensland',
  'SA': 'South Australia',
  'WA': 'Western Australia',
  'TAS': 'Tasmania',
  'ACT': 'Australian Capital Territory',
  'NT': 'Northern Territory',
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateMobileNumber = (number) => {
  const re = /^\+61\d{9}$/;
  return re.test(number);
};

const validatePostcode = (postcode) => {
  const re = /^\d{4}$/;
  return re.test(postcode);
};

function Register() {
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      setErrorMessage('Please enter a valid mobile number with country code (+61).');
      return;
    }

    if (!validatePostcode(postcode)) {
      setErrorMessage('Please enter a valid postcode.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      await authService.register(givenName, familyName, email, mobileNumber, password, state, postcode);
      navigate('/login');
    } catch (error) {
      const apiMessage = error.response?.data?.message || 'Registration failed';
      setErrorMessage(apiMessage);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group-row">
          <div className="form-group">
            <label>Given Name</label>
            <input
              type="text"
              placeholder="John"
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Family Name</label>
            <input
              type="text"
              placeholder="Doe"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="+61123456789"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group-row">
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group-row">
          <div className="form-group">
            <label>State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} required>
              <option value="">Select State</option>
              {Object.keys(states).map((stateKey) => (
                <option key={stateKey} value={stateKey}>{states[stateKey]}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Postcode</label>
            <input
              type="text"
              placeholder="1234"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="auth-button">Register</button>
        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </form>
    </div>
  );
}

export default Register;
