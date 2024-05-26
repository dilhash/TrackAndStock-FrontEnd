import axios from 'axios';
import config from '../config'; // Import configuration

const API_URL = config.apiUrl;

const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password }, { withCredentials: true });
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
  return response.data.user;
};

const logout = async () => {
  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};

export default {
  register,
  login,
  logout,
};
