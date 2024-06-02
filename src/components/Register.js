import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

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

    try {
      await authService.register(givenName, familyName, email, mobileNumber, password, state, postcode);
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        <label>Given Name</label>
        <input type="text" value={givenName} onChange={(e) => setGivenName(e.target.value)} required />
      </div>
      <div>
        <label>Family Name</label>
        <input type="text" value={familyName} onChange={(e) => setFamilyName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Mobile Number</label>
        <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>State</label>
        <select value={state} onChange={(e) => setState(e.target.value)} required>
          <option value="">Select State</option>
          {Object.keys(states).map((stateKey) => (
            <option key={stateKey} value={stateKey}>{states[stateKey]}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Postcode</label>
        <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
