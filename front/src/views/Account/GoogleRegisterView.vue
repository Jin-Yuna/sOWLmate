<template>
  <div>
    <h2>구글사용자를위한회원가입페이지</h2>
    <form @submit.prevent="signup(userData)">
      <!-- 닉네임 -->
      <div>
        <label for="nickname">닉네임: </label>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          id="nickname"
          v-model="userData.nickname"
          @input="nicknameCheck(userData.nickname)"
        />
        <p v-if="userData.nickname != '' && !isNicknameCheck">
          이미 있는 닉네임 입니다.
        </p>
        <p v-if="isNicknameCheck">사용할 수 있는 닉네임 입니다.</p>
      </div>
      <!-- 지역 설정 -->
      <div>
        <label for="region">지역: </label>
        <select name="region" id="region" v-model="userData.region">
          <option v-for="reg in regionList" :key="reg">{{ reg }}</option>
        </select>
      </div>
      <!-- 사용 언어 설정 -->
      <div>
        <label for="userlang">사용 언어: </label>
        <select name="userlang" id="userlang" v-model="userData.language">
          <option v-for="userlan in languageList" :key="userlan">
            {{ userlan }}
          </option>
        </select>
      </div>
      <!-- 선호 언어 설정 -->
      <div>
        <label for="preferlang">선호 언어: </label>
        <select
          name="preferlang"
          id="preferlang"
          v-model="userData.preferenceLanguage"
        >
          <option v-for="preferlang in languageList" :key="preferlang">
            {{ preferlang }}
          </option>
        </select>
      </div>
      <!-- 회원 가입 버튼 -->
      <v-btn
        type="submit"
        v-bind:disabled="!isNicknameCheck || userData.name === ''"
      >
        회원가입
      </v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'GoogleRegisterView',
  data() {
    return {
      userData: {
        id: '',
        password: '',
        name: '',
        profilePictureUrl: '',
        nickname: '',
        region: '',
        language: '',
        preferenceLanguage: '',
        loginType: '1',
      },
    };
  },
  created() {
    this.userData.id = this.$route.query.userid;
    this.userData.password = this.$route.query.userpwd;
    this.userData.name = this.$route.query.username;
    this.userData.profilePictureUrl = this.$route.query.userphotourl;
    this.userData.nickname = this.$route.query.usernickname;
    console.log(this.userData);
  },
  computed: {
    ...mapGetters(['isNicknameCheck', 'languageList', 'regionList']),
  },
  methods: {
    ...mapActions([
      'signup',
      'nicknameCheck',
      'getLanguageList',
      'getRegionList',
    ]),
  },
  mounted() {
    this.getLanguageList();
    this.getRegionList();
  },
};
</script>

<style></style>
