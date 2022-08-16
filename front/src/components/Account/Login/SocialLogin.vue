<template>
  <v-row>
    <v-col cols="12" lg="6" class="googlelogin">
      <a
        v-bind:href="`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&response_type=code&client_id=${googleConfig.client_id}&redirect_uri=${googleConfig.redirect_uri}`"
      >
        <v-btn class="d-flex">
          <img :src="require('@/assets/sowlImage/etc/google_logo.svg')" /><span
            class="ml-4"
            >구글 로그인</span
          >
        </v-btn>
      </a>
    </v-col>
  </v-row>
</template>

<script>
import sowl from '@/api/sowl';
export default {
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

<style scoped>
v-btn span {
  font-size: 0.8rem;
  line-height: -0.2rem;
}
.underline {
  text-decoration: underline;
}

p-small {
  position: relative;
  top: -0.8rem;
}
</style>
