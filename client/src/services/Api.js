import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers['x-auth-token'] = token;
  return req;
});

export default API;
