import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'https://conduit.productionready.io/api/',
  timeout: 10000,
})

export default {
  doLogin(userInfo) {
    return HTTP.post(`users/login`, {user: userInfo})
  },
  doRegister(userInfo) {
    return HTTP.post(`users`, {user: userInfo})
  },
}
