<template>
  <div>
    <SignUpCard />
    <form @submit.prevent="signup(userData)">
      <div>
        <label for="id">이메일: </label>
        <input type="text" id="id" v-model="userData.id">
      </div>
      <div>
        <label for="password1">비밀번회: </label>
        <input type="password" id="password1" v-model="userData.password1">
      </div>
      <div>
        <label for="password2">비밀번호 확인: </label>
        <input type="password" id="password2" v-model="userData.password2">
      </div>
      <div>
        <label for="nickname">닉네임: </label>
        <input type="text" id="nickname" v-model="userData.nickname">
      </div>
      <div>
        <label for="region">지역: </label>
        <select name="region" id="region" v-model="userData.region">
          <option v-for="reg in regions" :key="reg">{{ reg }}</option>
        </select>
      </div>
      <div>
        <label for="lang">언어: </label>
        <select name="lang" id="lang" v-model="userData.lang">
          <option v-for="lan in languages" :key="lan">{{ lan }}</option>
        </select>
      </div>
      <button>회원가입</button>
    </form>
      <!-- <div>
        <label for="region">지역: </label>
        <select name="region" id="region" v-model="userData.region">
          <option v-for="reg in regions" :key="reg">{{ reg }}</option>
        </select>
      </div> -->
    <router-link :to="{ name: 'LoginView' }">이미 회원이신가요?</router-link>
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
        lang: '',
        password1: '',
        password2: '',
        nickname: '',
        region: '',
      },
      regions: [
          'KOREA',
          'JAPAN',
          'CHINA',
          'UK',
      ],
      languages: [
          'KOREAN',
          'KOREAN',
      ]
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
  },
}
</script>

<style scoped></style>
