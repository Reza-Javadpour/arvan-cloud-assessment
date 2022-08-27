import {createRouter, createWebHistory} from 'vue-router';
import AuthLayout from '../layout/AuthLayout.vue';
import PanelLayout from '../layout/PanelLayout.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import Articles from '../views/panel/Articles.vue';
import Article from '../views/panel/Article.vue';

const routes = [
  {path: '/', redirect: '/articles'},
  {path: '/auth/login', name: 'Login', component: Login,  meta: { layout: AuthLayout }},
  {path: '/auth/register', name: 'Register', component: Register,  meta: { layout: AuthLayout }},
  {path: '/articles', name: 'Articles', component: Articles,  meta: { layout: PanelLayout }},
  {path: '/article/new', name: 'NewArticle', component: Article,  meta: { layout: PanelLayout }},
  {path: '/article/edit/:slug', name: 'EditArticle', component: Article,  meta: { layout: PanelLayout }},
]

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes
})
