<template>
  <div>
    <h3>NicknameEditForm.vue</h3>
    <div>
      <label for="nickname">닉네임: </label>
      <input
        type="text"
        id="nickname"
        v-model="nickname"
        @keydown="NICKNAME_CHECK(false)"
      />
      <p @click="nicknameCheck(nickname)">중복검사</p>
    </div>
    <div v-if="isNicknameCheck && nickname">
      <button @click="modifyUserInfo({ nickname: nickname })">저장</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'NicknameEditForm',
  data() {
    return {
      nickname: '',
    };
  },
  computed: {
    ...mapGetters(['isNicknameCheck']),
  },
  methods: {
    ...mapActions(['nicknameCheck', 'modifyUserInfo']),
    ...mapMutations(['NICKNAME_CHECK']),
  },
};
</script>

<style></style>
