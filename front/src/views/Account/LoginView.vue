<template>
  <v-container>
    <v-row>
      <v-col cols="7" class="auth-card">
        <LoginCard />
      </v-col>
      <v-col cols="5" xs="11">
        <v-container>
          <LoginForm />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import LoginForm from '@/components/Account/Login/LoginForm.vue';
import LoginCard from '@/components/Account/Login/LoginCard.vue';
// import firebase from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import sowl from '@/api/sowl.js';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
    LoginCard,
  },
  data() {
    return {
      userInfo: {
        token: null,
        displayName: null,
        email: null,
        photoURL: null,
        uid: null,
      },
    };
  },
  methods: {
    ...mapActions(['gooleLogin']),
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          this.userInfo.token = token;
          this.userInfo.displayName = user.displayName;
          this.userInfo.email = user.email;
          this.userInfo.photoURL = user.photoURL;
          this.userInfo.uid = user.uid;

          this.isExistUser(user.email); // 회원 여부 확인
        })
        .catch((error) => {
          console.log(error);
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
            // 구글 전용 회원가입 페이지로 이동한다.
            this.$router.push({
              name: 'GoogleRegisterView',
              query: {
                userid: userId,
                userpwd: this.userInfo.uid,
                username: this.userInfo.displayName,
                usernickname: this.userInfo.displayName,
                userphotourl: this.userInfo.photoURL,
              },
            });
          } else {
            // 유저의 회원가입 타입을 확인한다.
            this.checkLoginType(userId);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    checkLoginType(userId) {
      axios({
        url: sowl.users.loginType(),
        method: 'get',
        headers: {
          userId: userId,
        },
      })
        .then((response) => {
          if (response.data === 'GOOGLE') {
            // console.log('구글 로그인');
            let userData = {
              id: userId,
              password: this.userInfo.uid,
              token: this.userInfo.token,
            };
            this.gooleLogin(userData);
            // this.$router.push({ name: 'HomeView' });
          } else {
            // console.log('이미 사용한 이메일입니다.');
            alert('사이트 자체적으로 가입한 이메일입니다.');
            this.$router.go();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped></style>
