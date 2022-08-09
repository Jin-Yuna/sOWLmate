<template>
  <div>
    <h1>LoginView.vue</h1>
    <div class="googlelogin">
      <a
        v-bind:href="`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&response_type=code&client_id=${googleConfig.client_id}&redirect_uri=${googleConfig.redirect_uri}`"
      >
        구글로 로그인
      </a>
    </div>
    <LoginForm />
    <router-link :to="{ name: 'SignUpView' }">처음 오셨나요?</router-link>
  </div>
</template>

<script>
import sowl from '@/api/sowl';
import LoginForm from '@/components/Account/Login/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
  },
  data() {
    return {
      googleConfig: {
        client_id: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
        redirect_uri:
          sowl.front.googleRequest() + 'accounts/auth/google/callback',
      },
    };
  },
};
</script>

<style></style>
