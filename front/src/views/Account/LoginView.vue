<template>
  <div>
    <h1>LoginView.vue</h1>
    <GoogleLogin />
    <LoginForm />
    <router-link :to="{ name: 'SignUpView' }">처음 오셨나요?</router-link>
  </div>
</template>

<script>
import LoginForm from '@/components/Account/Login/LoginForm.vue';
import GoogleLogin from '@/components/Account/Login/GoogleLogin.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
    GoogleLogin,
  },
};
</script>

<style></style>
