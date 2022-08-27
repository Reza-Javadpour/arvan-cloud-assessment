import axios from './interceptor.js';

export default {
  getArticles() {
    return axios.get(`articles`);
  },
  createArticle(body) {
    return axios.post(`articles`, {article: body});
  },
  getTags() {
    return axios.get(`tags`);
  },
}
