<template>
  <div>
    <h1>LoginView.vue</h1>
    <div class="googlelogin">
      <button @click="loginWithGoogle">구글로 로그인</button>
    </div>
    <LoginForm />
    <router-link :to="{ name: 'SignUpView' }">처음 오셨나요?</router-link>
  </div>
</template>

<script>
import LoginForm from '@/components/Account/Login/LoginForm.vue';
// import firebase from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import sowl from '@/api/sowl.js';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
  },
  methods: {
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log(token);
          console.log(user.displayName);
          console.log(user.email);
          console.log(user.photoURL);
          console.log(user.uid);

          this.isExistUser(user.email);
        })
        .catch((error) => {
          console.log(error.codeCode);
          console.log(error.message);
        });
    },
    isExistUser(userId) {
      axios({
        url: sowl.users.idCheck(),
        method: 'get',
        headers: {
          userId: userId,
        },
      })
        .then((response) => {
          if (response.data != 'exist') {
            console.log('회원가입 가능');
            // 구글 전용 회원가입 페이지로 이동한다.
            this.$router.push({ name: 'GoogleRegisterView' });
          } else {
            console.log('이미 사용중인 이메일');
            // 유저의 회원가입 타입을 확인한다.
            // 구글 회원가입유저라면, 로그인을 시도한다.
            // 구글 회원가입유저가 아니라면, 이미 사용한 이메일이라고 표시한다.
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style></style>
