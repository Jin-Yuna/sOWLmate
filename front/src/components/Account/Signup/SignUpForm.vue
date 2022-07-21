<template>
  <div>
    <SignUpCard />
    <form @submit.prevent="signup(userData)">
      <div>
        <label for="username">아이디: </label>
        <input type="text" id="username" v-model="userData.id">
      </div>
      <div>
        <label for="password">비밀번호: </label>
        <input type="password" id="password" v-model="userData.password">
      </div>
      <div>
        <label for="password2">비밀번호: </label>
        <input type="password" id="password2" v-model="userData.password2">
      </div>
      <button>회원가입</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SignUpCard from '@/components/Account/Signup/SignUpCard.vue'

export default {
  components: {
    SignUpCard,
  },
  data() {
    return {
      userData: {
        id: '',
        password: '',
        password2: '',
      }
    }
  },
  computed: {
    passwordCheck() {
      console.log(this.userData)
      if (this.userData.password1 == this.userData.password2) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions(['signup']),
  }
}
</script>

<style>

</style>