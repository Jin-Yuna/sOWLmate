<template>
  <div>
    <PasswordResetCard />
    <form @submit.prevent="resetPassword(userData)">
      <div>
        <label for="username">아이디 : </label>
        <input
          type="email"
          placeholder="아이디를 입력하세요"
          id="id"
          v-model="userData.id"
          @keyup="idCheck(userData.id)"
        />
        {{ isIdCheck }}
        <p v-if="!isIdCheck">아이디를 정확하게 입력해주세요.</p>
        <p v-if="isIdCheck">아이디가 확인되었습니다.</p>
      </div>
      <div>
        <label for="nickname">닉네임 : </label>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          id="nickname"
          v-model="userData.nickname"
        />
      </div>
      <PasswordResetModal v-if="showModal" @close="pageLink()" />
      <v-btn
        type="submit"
        v-bind:disabled="!isIdCheck"
        @click="showModal = true"
      >
        임시 비밀번호 전송
      </v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PasswordResetCard from '@/components/Account/PasswordReset/PasswordResetCard.vue';
import PasswordResetModal from '@/components/Account/PasswordReset/PasswordResetModal.vue';

export default {
  name: 'PasswordResetForm',
  components: {
    PasswordResetCard,
    PasswordResetModal,
  },
  data() {
    return {
      showModal: false,
      userData: {
        id: '',
        nickname: '',
      },
    };
  },
  computed: {
    ...mapGetters(['isIdCheck', 'isIdNicknameCheck']),
  },
  methods: {
    ...mapActions(['idCheck', 'resetPassword']),
    pageLink() {
      console.log(this.isIdNicknameCheck);
      if (this.isIdNicknameCheck) {
        this.$router.push({ name: 'LoginView' });
      }
      this.showModal = false;
    },
  },
};
</script>

<style></style>
