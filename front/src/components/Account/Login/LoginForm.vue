<template>
  <div>
    <LoginCard />
    <form @submit.prevent="login(userData)">
      <div>
        <label for="username">아이디: </label>
        <input type="text" id="username" v-model="userData.id">
      </div>
      <div>
        <label for="password">비밀번호: </label>
        <input type="password" id="password" v-model="userData.password">
      </div>
      <button>로그인</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LoginCard from '@/components/Account/Login/LoginCard.vue'

export default {
  components: {
    LoginCard,
  },
  data() {
    return {
      userData: {
        id: '',
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