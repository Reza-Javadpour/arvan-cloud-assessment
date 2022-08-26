import {createRouter, createWebHistory} from 'vue-router';
import Articles from '../views/panel/Articles.vue';
import NewArticle from '../views/panel/NewArticle.vue';
import PanelLayout from '../layout/PanelLayout.vue';
import Login from '../views/auth/Login.vue';
import AuthLayout from '../layout/AuthLayout.vue';

const routes = [
  {path: '/', redirect: '/articles'},
  {path: '/articles', name: 'Articles', component: Articles,  meta: { layout: PanelLayout }},
  {path: '/articles/new', name: 'NewArticle', component: NewArticle,  meta: { layout: PanelLayout }},
  {path: '/auth/login', name: 'Login', component: Login,  meta: { layout: AuthLayout }},
]

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes
})
