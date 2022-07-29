<template>
  <div>
    <h3>PasswordEditForm.vue</h3>
    <h3>[-ing] 현재 비밀번호를 맞게 입력했는지 확인하는 api 필요</h3>
    {{ userInfo }}
      <div>
        <label for="currentPassword">현재 비밀번호: </label>
        <input type="password" id="currentPassword" v-model="currentPassword" @keyup="getUserInfo()">
      </div>
      <div>
        <label for="password">새로운 비밀번호: </label>
        <input type="password" id="password" v-model="password" @keyup="passwordDoubleCheck({ password : password, password2 : password2 })">
      </div>
      <div>
        <label for="password2">비밀번호 확인: </label>
        <input type="password" id="password2" v-model="password2" @keyup="passwordDoubleCheck({ password : password, password2 : password2 })">
      </div>
      <button v-if="isPasswordDoubleCheck" @click="modifyUserInfo({ 'password': password })">비밀번호 변경</button>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PasswordEditForm',
  data() {
    return {
      currentPassword: '',
      password: '',
      password2: '',
    }
  },
  computed: {
    ...mapGetters(['isPasswordDoubleCheck', 'userInfo'])
  },
  methods: {
    ...mapActions(['passwordDoubleCheck', 'getUserInfo', 'modifyUserInfo']),
  },
  
}
</script>

<style></style>