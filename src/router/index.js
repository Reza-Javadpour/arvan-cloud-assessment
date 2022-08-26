import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/panel/Home.vue';
import PanelLayout from '../layout/PanelLayout.vue';
import Login from '../views/auth/Login.vue';
import AuthLayout from '../layout/AuthLayout.vue';

const routes = [
  {path: '/', redirect: '/home'},
  {path: '/home', name: 'Home', component: Home,  meta: { layout: PanelLayout }},
  {path: '/auth/login', name: 'Login', component: Login,  meta: { layout: AuthLayout }},
]

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes
})
