import { createRouter, createWebHistory } from 'vue-router';
import AuthLayout from '../layout/AuthLayout.vue';
import PanelLayout from '../layout/PanelLayout.vue';
import Login from '../views/auth/LoginPage.vue';
import Register from '../views/auth/RegisterPage.vue';
import ArticlesPage from '../views/panel/ArticlesPage.vue';
import ArticlePage from '../views/panel/ArticlePage.vue';

const routes = [
  { path: '/', redirect: '/articles' },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
    meta: { layout: AuthLayout },
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: Register,
    meta: { layout: AuthLayout },
  },
  {
    path: '/articles',
    name: 'Articles',
    component: ArticlesPage,
    meta: { layout: PanelLayout },
  },
  {
    path: '/article/new',
    name: 'NewArticle',
    component: ArticlePage,
    meta: { layout: PanelLayout },
  },
  {
    path: '/article/edit/:slug',
    name: 'EditArticle',
    component: ArticlePage,
    meta: { layout: PanelLayout },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
});
