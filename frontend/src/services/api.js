import axios from 'axios';

const isProd = import.meta.env.MODE === 'production';
const defaultApiBase = isProd
  ? 'https://backend.nandinilayoutclub.in/api'
  : '/api';
const defaultUploadsBase = isProd
  ? 'https://backend.nandinilayoutclub.in'
  : '';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultApiBase,
  timeout: 15000,
});

// Attach JWT for admin routes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('nlc_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('nlc_admin_token');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

export const getImageUrl = (path) => {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `${import.meta.env.VITE_UPLOADS_URL || defaultUploadsBase}${path}`;
};

export default API;
