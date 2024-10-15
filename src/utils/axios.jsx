import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3002/',  // Set your backend base URL
  withCredentials: true,              // Include credentials (e.g., cookies, JWT tokens)
});

export default axiosInstance;
