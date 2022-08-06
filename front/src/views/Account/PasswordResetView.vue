<template>
  <div>
    <h1>PasswordResetView.vue</h1>
    <PasswordResetForm />
    <router-link :to="{ name: 'LoginView' }"
      >비밀번호가 생각나셨나요?</router-link
    >
  </div>
</template>

<script>
import PasswordResetForm from '@/components/Account/PasswordReset/PasswordResetForm.vue';

export default {
  name: 'PasswordResetView',
  components: {
    PasswordResetForm,
  },
};
</script>

<style></style>
