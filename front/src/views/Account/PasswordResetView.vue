<template>
  <div>
    <h1>PasswordResetView.vue</h1>
    <PasswordResetForm />
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
