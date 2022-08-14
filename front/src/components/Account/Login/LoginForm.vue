<template>
  <div>
    <h1 class="mt-16 mb-6">Login</h1>
    <form @submit.prevent="login(userData)">
      <div>
        <v-text-field
          color="primary"
          label="아이디(Email)"
          variant="underlined"
          v-model="userData.id"
          @input="idValidCheck()"
        ></v-text-field>
        <p v-if="!isEmailValidCheck && userData.id != ''">
          이메일 형식으로 입력해주세요
        </p>
        <p v-if="isEmailValidCheck && isIdCheck">
          없는 아이디 입니다. 아이디를 정확하게 입력해주세요.
        </p>
      </div>
      <div>
        <v-text-field
          color="primary"
          label="비밀번호"
          variant="underlined"
          v-model="userData.password"
          type="password"
        ></v-text-field>
      </div>
      <p v-if="isLoginFail === 'fail' && !isIdCheck && userData.id != ''">
        비밀번호가 틀렸습니다.
      </p>
      <div class="mt-6">
        <router-link :to="{ name: 'PasswordResetView' }"
          >비밀번호를 잊으셨나요?</router-link
        >
      </div>
      <v-btn
        class="main-btn"
        width="100%"
        type="submit"
        v-bind:disabled="
          userData.id === '' || userData.password === '' || isIdCheck
        "
      >
        로그인
      </v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'LoginForm',
  data() {
    return {
      userData: {
        password: '',
        id: '',
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
};
</script>

<style lang="scss" scoped>
.ssss {
  color: $color-purple;
}
</style>
