<template>
  <max-container>
    <v-row>
      <v-col cols="5">
        <LoginCard />
      </v-col>
      <v-col cols="5">
        <div>
          <LoginForm />
          <div class="googlelogin">
            <a
              v-bind:href="`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&response_type=code&client_id=${googleConfig.client_id}&redirect_uri=${googleConfig.redirect_uri}`"
            >
              구글로 로그인
            </a>
          </div>
          <router-link :to="{ name: 'SignUpView' }">처음 오셨나요?</router-link>
        </div>
      </v-col>
    </v-row>
  </max-container>
</template>

<script>
import sowl from '@/api/sowl';
import LoginForm from '@/components/Account/Login/LoginForm.vue';
import LoginCard from '@/components/Account/Login/LoginCard.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
    LoginCard,
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

<style scoped></style>
