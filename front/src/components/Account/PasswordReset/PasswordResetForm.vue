<template>
  <div>
    <PasswordResetCard />
    <form @submit.prevent="passwordreset(userData)">
      <div>
        <label for="username">아이디 : </label>
        <input type="email" id="id" v-model="userData.id" @keyup="idCheck()" />
      </div>
      <div>
        <label for="nickname">닉네임 : </label>
        <input type="text" id="nickname" v-model="userData.nickname" />
      </div>
      <button v-bind:disabled="!idCheckeds"></button>
    </form>
    <router-link :to="{ name: 'LoginView' }"
      >비밀번호가 생각나셨나요?</router-link
    >
  </div>
</template>

<script>
import PasswordResetCard from '@/components/Account/PasswordReset/PasswordResetCard.vue';

export default {
  name: 'PasswordResetForm',
  components: {
    PasswordResetCard,
  },
};
</script>

<style></style>
