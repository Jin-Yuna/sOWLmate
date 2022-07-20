import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/Account/LoginView.vue'
import LogoutView from '@/views/Account/LogoutView.vue'

const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/auth/login/', name: '/LoginView', component: LoginView },
  { path: '/auth/logout/', name: 'LogoutView', component: LogoutView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router;
