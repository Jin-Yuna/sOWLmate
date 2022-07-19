<template>
  <form @submit.prevent="login(userData)">
    <div>
      <label for="username">아이디: </label>
      <input type="text" id="username" v-model="userData.username">
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input type="password" id="password" v-model="userData.password">
    </div>
    <button>로그인</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      userData: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions(['login']),
  }
}
</script>

<style>

</style>