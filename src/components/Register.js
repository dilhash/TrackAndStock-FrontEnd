import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

// Australian states and their corresponding postcodes
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

// Function to validate email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Function to validate mobile number format
const validateMobileNumber = (number) => {
  const re = /^\+61\d{9}$/; // Assuming Australian country code +61
  return re.test(number);
};

// Function to validate postcode format (basic validation)
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      alert('Please enter a valid mobile number with country code (+61).');
      return;
    }

    if (!validatePostcode(postcode)) {
      alert('Please enter a valid postcode.');
      return;
    }

    try {
      await authService.register(givenName, familyName, email, mobileNumber, password, state, postcode);
      navigate('/login');
    } catch (error) {
      alert(error.response.data.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
