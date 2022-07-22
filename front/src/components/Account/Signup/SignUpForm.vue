<template>
  <div>
    <SignUpCard />
    <form @submit.prevent="signup(userData)">
      <div>
        <label for="id">이메일: </label>
        <input type="email" id="id" v-model="userData.id">
        <p @click="idCheck()">중복검사</p>
        <!-- 버튼으로 하면 form 제출되서 임시로 p로 해둠 -->
      </div>
      <div>
        <label for="password">비밀번호: </label>
        <input type="password" id="password" v-model="userData.password">
      </div>
      <div>
        <label for="password2">비밀번호 확인: </label>
        <input type="password" id="password2" v-model="userData.password2">
        <p v-if="!passwordCheck">비밀번호가 일치하지 않습니다</p>
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
      <button v-if="passwordCheck && idChecked">회원가입</button>
    </form>
    <router-link :to="{ name: 'LoginView' }">이미 회원이신가요?</router-link>
  </div>
</template>

<script>

import axios from 'axios'
import sowl from '@/api/sowl'
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
        password: '',
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
      ],
      idChecked : false,
    }
  },
  computed: {
    passwordCheck() {
      if (this.userData.password == this.userData.password2) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions(['signup']),
    // id는 변경이 안되니까 id중복체크도 쓸 곳이 회원가입 폼 뿐인 것 같아서 여기다 id중복체크 만듦
    idCheck() {
      axios({
        url: `${sowl.users.signup()}${this.userData.id}`,
        method: 'get',
        // data: JSON.stringify(userData)
      })
      .then(response => {
        console.log(response)
        if (response.data != 'success') {
          this.idChecked = true
        }
      })
      .catch(error => {
        console.error(error)
      }) 
    },
  },
}
</script>

<style scoped></style>
