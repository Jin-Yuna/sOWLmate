<template>
  <v-container>
    <v-row>
      <v-col cols="8" class="login-card">
        <LoginCard />
      </v-col>
      <v-col cols="4" xs="11">
        <v-container>
          <LoginForm />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from '@/components/Account/Login/LoginForm.vue';
import LoginCard from '@/components/Account/Login/LoginCard.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
    LoginCard,
  },
};
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .login-card {
    display: none;
  }
}
</style>
