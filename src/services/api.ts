import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Your Django URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add a request interceptor for JWT Auth later
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;