import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/Account/LoginView.vue'
import LogoutView from '@/views/Account/LogoutView.vue'
import SignUpView from '@/views/Account/SignUpView.vue'
import MyPageBasicView from '@/views/Account/MyPageBasicView.vue'
import MyPageEditPasswordView from '@/views/Account/MyPageEditPasswordView.vue'
import MyPageEditInterestView from '@/views/Account/MyPageEditInterestView.vue'
import MyPageEditLanguageView from '@/views/Account/MyPageEditLanguageView.vue'


const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/auth/login/', name: 'LoginView', component: LoginView },
  { path: '/auth/logout/', name: 'LogoutView', component: LogoutView },
  { path: '/auth/sign-up/', name: 'SignUpView', component: SignUpView },
  { 
    path: '/auth/mypage/basic-info/', 
    name: 'MyPageBasicView', 
    component: MyPageBasicView,
    children : [
      { path: '/auth/mypage/change-password/', name: 'MyPageEditPasswordView', component: MyPageEditPasswordView },
      { path: '/auth/mypage/change-interest/', name: 'MypageEditInterestView', component: MyPageEditInterestView },
      { path: '/auth/mypage/change-language/', name: 'MyPageEditLanguageView', component: MyPageEditLanguageView },
    ],
  },
 
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;
