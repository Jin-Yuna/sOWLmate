<template>
  <div>
    <h3>PasswordEditForm.vue</h3>
    <div>
      <label for="currentPassword">현재 비밀번호: </label>
      <input type="password" id="currentPassword" v-model="currentPassword" />
    </div>
    <div>
      <label for="password">새로운 비밀번호: </label>
      <input
        type="password"
        id="password"
        v-model="password"
        @keyup="
          passwordDoubleCheck({ password: password, password2: password2 })
        "
      />
    </div>
    <div>
      <label for="password2">비밀번호 확인: </label>
      <input
        type="password"
        id="password2"
        v-model="password2"
        @keyup="
          passwordDoubleCheck({ password: password, password2: password2 })
        "
      />
    </div>
    <button v-if="isPasswordDoubleCheck" @click="passwordChange()">
      비밀번호 변경
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import sowl from '@/api/sowl';

export default {
  name: 'PasswordEditForm',
  data() {
    return {
      currentPassword: '',
      password: '',
      password2: '',
    };
  },
  computed: {
    ...mapGetters(['isPasswordDoubleCheck', 'currentUser']),
  },
  methods: {
    ...mapActions(['passwordDoubleCheck']),
    passwordChange() {
      axios({
        url: sowl.users.changePassword(),
        method: 'put',
        data: {
          userId: this.currentUser,
          currentPW: this.currentPassword,
          newPW: this.password,
        },
      })
        .then((response) => {
          if (response.data === 'done') {
            alert('비밀번호가 성공적으로 변경되었습니다');
          } else {
            alert('현재 비밀번호와 일치하지 않습니다.');
          }
          this.currentPassword = '';
          this.password = '';
          this.password2 = '';
          this.passwordDoubleCheck({ password: '1', password2: '' });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
