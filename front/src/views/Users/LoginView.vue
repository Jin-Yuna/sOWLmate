<template>
  <form @submit="login">
    <div>
      <label for="username">아이디: </label>
      <input type="text" id="username" v-model="username">
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input type="password" id="password" v-model="password">
    </div>
    <button>로그인</button>
  </form>
</template>

<script>

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login(event) {
      event.preventDefault()
      const userData = {
        username : this.username,
        password : this.password,
      }
      this.$store.dispatch('login', userData)
    }
  }

}
</script>

<style>

</style>