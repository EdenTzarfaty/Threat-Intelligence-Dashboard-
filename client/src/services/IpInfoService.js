import axios from 'axios';

// Get the base URL from the .env
const baseUrl = process.env.REACT_APP_API_BASE_URL; // e.g., http://localhost:3001/api/intel

// Call to backend to retrieves IP data
export const getIpInfo = async (ip) => {
  try {
    const response = await axios.get(`${baseUrl}/${ip}`);
    return { data: response.data, error: null };
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'An unknown error occurred.';
    return { data: null, error: message };
  }
};
