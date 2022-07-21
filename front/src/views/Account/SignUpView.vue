<template>
  <div>
    <h1>SingupView.vue</h1>
    <SignUpForm />
  </div>
</template>

<script>
import SignUpForm from '@/components/Account/Signup/SignUpForm.vue'

export default {
  name: 'SignUpView',
  components : {
    SignUpForm,
  }
}
</script>

<style>

</style>