<template>
  <div>
    <h1>LoginView.vue</h1>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/Account/Login/LoginForm.vue'

export default {
  name: 'LoginView',
  components : {
    LoginForm,
  }
}
</script>

<style></style>