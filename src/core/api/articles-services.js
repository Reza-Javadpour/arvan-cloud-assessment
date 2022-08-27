import axios from './interceptor.js';

export default {
  getArticles() {
    return axios.get(`articles`);
  },
  getArticleBySlug(slug) {
    if (slug) {
      return axios.get(`articles/${slug}`);
    } else {
      return false;
    }
  },
  createArticle(body) {
    return axios.post(`articles`, { article: body });
  },
  editArticle(body, slug) {
    return axios.put(`articles/${slug}`, { article: body });
  },
  removeArticle(slug) {
    return axios.delete(`articles/${slug}`);
  },
  getTags() {
    return axios.get(`tags`);
  },
};
