import axios from 'axios';
import config from '../config';

const API_URL = config.apiUrl;

const register = async (givenName, familyName, email, mobileNumber, password, state, postcode) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      givenName,
      familyName,
      email,
      mobileNumber,
      password,
      state,
      postcode,
    }, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw new Error('Network error: Unable to reach the server');
    }
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
    return response.data.user;
  } catch (error) {
    if (!error.response) {
      throw new Error('Network error: Unable to reach the server');
    }
    throw error;
  }
};

const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  } catch (error) {
    if (!error.response) {
      throw new Error('Network error: Unable to reach the server');
    }
    throw error;
  }
};

export default {
  register,
  login,
  logout,
};
