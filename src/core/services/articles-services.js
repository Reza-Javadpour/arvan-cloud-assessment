import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'https://conduit.productionready.io/api/',
  timeout: 10000,
})

export default {
  getArticles() {
    return HTTP.get(`articles`);
  },
  getTags() {
    return HTTP.get(`tags`);
  },
}
