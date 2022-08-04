<template>
  <div>
    <PasswordResetCard />
    <form @submit.prevent="resetPassword(userData)">
      <div>
        <label for="userId">아이디 : </label>
        <input
          type="email"
          placeholder="아이디(이메일)를 입력하세요"
          id="userId"
          v-model="userData.userId"
          @input="idCheck(userData.userId)"
        />
        <p v-if="isIdCheck || !isIdChecked">아이디를 정확하게 입력해주세요.</p>
        <p v-if="!isIdCheck">아이디가 확인되었습니다.</p>
      </div>
      <div>
        <label for="userName">유저 이름 : </label>
        <input
          type="text"
          placeholder="유저 이름을 입력하세요"
          id="userName"
          v-model="userData.userName"
        />
      </div>
      <v-btn
        type="submit"
        v-bind:disabled="isIdCheck"
        @click="showModal = true"
      >
        임시 비밀번호 전송
      </v-btn>
    </form>
    <PasswordResetModal v-if="showModal" @close="pageLink()" />
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
        userId: '',
        userName: '',
      },
    };
  },
  computed: {
    ...mapGetters(['isIdCheck', 'isIdChecked', 'isIdUsernameCheck']),
  },
  methods: {
    ...mapActions(['idCheck', 'resetPassword']),
    pageLink() {
      console.log(this.isIdUsernameCheck);
      if (this.isIdUsernameCheck) {
        this.$router.push({ name: 'LoginView' });
      }
      this.showModal = false;
    },
  },
};
</script>

<style></style>
