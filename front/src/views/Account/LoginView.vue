<template>
  <div>
    <h1>LoginView.vue</h1>
    <LoginForm />
    <router-link :to="{ name: 'SignUpView' }">처음 오셨나요?</router-link>
  </div>
</template>

<script>
import LoginForm from '@/components/Account/Login/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
  },
};
</script>

<style></style>
