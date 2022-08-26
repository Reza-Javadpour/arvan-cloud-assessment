import {createRouter, createWebHistory} from 'vue-router';
import AuthLayout from '../layout/AuthLayout.vue';
import PanelLayout from '../layout/PanelLayout.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import Articles from '../views/panel/Articles.vue';
import NewArticle from '../views/panel/NewArticle.vue';

const routes = [
  {path: '/', redirect: '/articles'},
  {path: '/auth/login', name: 'Login', component: Login,  meta: { layout: AuthLayout }},
  {path: '/auth/register', name: 'Register', component: Register,  meta: { layout: AuthLayout }},
  {path: '/articles', name: 'Articles', component: Articles,  meta: { layout: PanelLayout }},
  {path: '/articles/new', name: 'NewArticle', component: NewArticle,  meta: { layout: PanelLayout }},
]

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes
})
