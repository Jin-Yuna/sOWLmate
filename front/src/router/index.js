import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/Account/LoginView.vue'
import LogoutView from '@/views/Account/LogoutView.vue'
import SignUpView from '@/views/Account/SignUpView.vue'

const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/auth/login/', name: 'LoginView', component: LoginView },
  { path: '/auth/logout/', name: 'LogoutView', component: LogoutView },
  { path: '/auth/sign-up/', name: 'SignUpView', component: SignUpView },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;
