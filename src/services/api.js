// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://172.20.10.4:5000/api', // use your backend host
  withCredentials: false,
});

// Attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;