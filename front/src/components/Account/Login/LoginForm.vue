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
        />
      </div>
      <div>
        <label for="password">비밀번호: </label>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          id="password"
          v-model="userData.password"
        />
      </div>
      <div>
        <router-link :to="{ name: 'PasswordResetView' }"
          >비밀번호를 잊으셨나요?</router-link
        >
      </div>
      <button>로그인</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import LoginCard from '@/components/Account/Login/LoginCard.vue';

export default {
  components: {
    LoginCard,
  },
  data() {
    return {
      userData: {
        id: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions(['login']),
  },
};
</script>

<style></style>
