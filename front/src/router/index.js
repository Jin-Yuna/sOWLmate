import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/Account/LoginView.vue';
import LogoutView from '@/views/Account/LogoutView.vue';
import SignUpView from '@/views/Account/SignUpView.vue';
import PasswordResetView from '@/views/Account/PasswordResetView.vue';
import MyPageBasicView from '@/views/Account/MyPageBasicView.vue';
import MyPageEditPasswordView from '@/views/Account/MyPageEditPasswordView.vue';
import MyPageEditInterestView from '@/views/Account/MyPageEditInterestView.vue';
import MyPageEditLanguageView from '@/views/Account/MyPageEditLanguageView.vue';
import MyPageBasicInfoView from '@/views/Account/MyPageBasicInfoView.vue';
import RoomMainView from '@/views/Room/RoomMainView.vue';
import RoomCreateView from '@/views/Room/RoomCreateView.vue';
import RoomMainListView from '@/views/Room/List/RoomMainListView.vue';
import RoomFriendsListView from '@/views/Room/List/RoomFriendsListView.vue';
import RoomLanguageListView from '@/views/Room/List/RoomLanguageListView.vue';
import RoomInterestListView from '@/views/Room/List/RoomInterestListView.vue';

const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/auth/login/', name: 'LoginView', component: LoginView },
  { path: '/auth/logout/', name: 'LogoutView', component: LogoutView },
  { path: '/auth/sign-up/', name: 'SignUpView', component: SignUpView },
  {
    path: '/auth/password-reset/',
    name: 'PasswordResetView',
    component: PasswordResetView,
  },
  {
    path: '/auth/mypage/',
    name: 'MyPageBasicView',
    component: MyPageBasicView,
    children: [
      {
        path: 'basic-info/',
        name: 'MyPageBasicInfoView',
        component: MyPageBasicInfoView,
      },
      {
        path: 'change-password/',
        name: 'MyPageEditPasswordView',
        component: MyPageEditPasswordView,
      },
      {
        path: 'change-interest/',
        name: 'MypageEditInterestView',
        component: MyPageEditInterestView,
      },
      {
        path: 'change-language/',
        name: 'MyPageEditLanguageView',
        component: MyPageEditLanguageView,
      },
    ],
  },
  {
    path: '/portal/rooms/',
    name: 'RoomMainView',
    component: RoomMainView,
    children: [
      {
        path: 'main/',
        name: 'RoomMainListView',
        component: RoomMainListView,
      },
      {
        path: 'friend/',
        name: 'RoomFriendsListView',
        component: RoomFriendsListView,
      },
      {
        path: 'language/',
        name: 'RoomLanguageListView',
        component: RoomLanguageListView,
      },
      {
        path: 'interest/',
        name: 'RoomInterestListView',
        component: RoomInterestListView,
      },
    ],
  },
  {
    path: '/portal/rooms/create/',
    name: 'RoomCreateView',
    component: RoomCreateView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
