<template>
  <div>
    <h1>SingupView.vue</h1>
    <SignUpForm />
    <router-link :to="{ name: 'LoginView' }">이미 회원이신가요?</router-link>
  </div>
</template>

<script>
import SignUpForm from '@/components/Account/Signup/SignUpForm.vue';

export default {
  name: 'SignUpView',
  components: {
    SignUpForm,
  },
};
</script>

<style></style>
