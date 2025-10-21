import axios from "axios";

const adminAPI = axios.create({
  baseURL: "http://172.20.10.4:5000/api",
  withCredentials: false,
});

adminAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default adminAPI;