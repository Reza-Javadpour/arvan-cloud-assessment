import axios from 'axios';
import { API_TIMEOUT, API_URL } from './config.js';
import { getToken } from '../storage.js';
import { doLogout } from '../auth.js';

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = API_TIMEOUT;

axios.interceptors.request.use(config => {
  const token = getToken();
  config.headers.authorization = token ? `Token ${token}` : '';
  return config;
});

axios.interceptors.response.use(undefined, onReject => {
  if (onReject.response.status === 401) {
    doLogout();
  }
  return onReject.response;
})

export default axios;
