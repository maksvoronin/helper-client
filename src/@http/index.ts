import axios from 'axios';
import apiConfig from '../config';

const $api = axios.create({
  withCredentials: true,
  baseURL: apiConfig.API
});

$api.interceptors.request.use(config => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
});

export default $api;