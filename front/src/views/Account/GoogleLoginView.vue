<template>
  <GoogleLogin :params="googleParams" :onSuccess="googleSuccess">
    <img src="@/assets/user/logo/google.png" />
    <b> Continue with Google</b>
  </GoogleLogin>
</template>
<script>
export default {
  name: 'GoogleLoginView',
  data() {
    return {
      params: {
        client_id: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
      },
    };
  },
  methods: {
    GoogleLoginSuccess() {
      if (localStorage.getItem('access-token'))
        return alert('이미 로그인 되어있습니다.');
      // Google.GoogleLoginSuccess(googleUser);
    },
  },
};
</script>
