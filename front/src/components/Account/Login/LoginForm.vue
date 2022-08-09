<template>
  <div>
    <LoginCard />
    <form @submit.prevent="login(userData)">
      <div>
        <label for="userId">아이디: </label>
        <input
          type="text"
          placeholder="아이디(이메일)를 입력하세요"
          id="userId"
          v-model="userData.id"
          @input="idValidCheck()"
        />
      </div>
      <p v-if="!isEmailValidCheck && userData.id != ''">
        이메일 형식으로 입력해주세요
      </p>
      <p v-if="isEmailValidCheck && isIdCheck">
        없는 아이디 입니다. 아이디를 정확하게 입력해주세요.
      </p>
      <div>
        <label for="password">비밀번호: </label>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          id="password"
          v-model="userData.password"
        />
      </div>
      <p v-if="isLoginFail === 'fail' && !isIdCheck && userData.id != ''">
        비밀번호가 틀렸습니다.
      </p>
      <div>
        <router-link :to="{ name: 'PasswordResetView' }"
          >비밀번호를 잊으셨나요?</router-link
        >
      </div>
      <v-btn
        type="submit"
        v-bind:disabled="
          userData.id === '' || userData.password === '' || isIdCheck
        "
      >
        로그인
      </v-btn>
    </form>
    <div class="googlelogin">
      <a
        v-bind:href="`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&response_type=code&client_id=${googleConfig.client_id}&redirect_uri=${googleConfig.redirect_uri}`"
      >
        구글~
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import LoginCard from '@/components/Account/Login/LoginCard.vue';
import sowl from '@/api/sowl';
export default {
  name: 'LoginForm',
  components: {
    LoginCard,
  },
  data() {
    return {
      userData: {
        password: '',
        id: '',
      },
      googleConfig: {
        client_id: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID,
        redirect_uri:
          sowl.front.googleRequest() + 'accounts/auth/google/callback',
      },
    };
  },
  computed: {
    ...mapGetters(['isIdCheck', 'isEmailValidCheck', 'isLoginFail']),
  },
  methods: {
    ...mapActions(['login', 'idCheck', 'emailValidCheck']),
    ...mapMutations(['LOGIN_FAIL']),
    idValidCheck() {
      this.idCheck(this.userData.id);
      this.emailValidCheck(this.userData.id);
      this.LOGIN_FAIL('succcess');
    },
  },
  mounted() {
    console.log(this.googleConfig.redirect_uri);
  },
};
</script>

<style></style>
