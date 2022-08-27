import axios from 'axios';
import { API_TIMEOUT, API_URL } from './config.js';

export const HTTP = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
})

export default {
  doLogin(userInfo) {
    return HTTP.post(`users/login`, {user: userInfo})
  },
  doRegister(userInfo) {
    return HTTP.post(`users`, {user: userInfo})
  },
}
