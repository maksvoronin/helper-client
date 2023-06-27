import axios from 'axios';
import config from '../config';

const $api = axios.create({
  withCredentials: true,
  baseURL: config.API
})

$api.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
})

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.data.status === "error" && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get(`${config.API}/auth/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      return $api.request(originalRequest);
    } catch (e) {
      console.log('НЕ АВТОРИЗОВАН');
    }
  }
  throw error;
})

export default $api;