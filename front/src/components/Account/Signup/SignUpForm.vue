<template>
  <div>
    <SignUpCard />
    <form @submit.prevent="signup(userData)">
      <div>
        <label for="id">아이디 : </label>
        <input
          type="email"
          placeholder="아이디(이메일)를 입력하세요"
          id="id"
          v-model="userData.id"
        />
        <p v-if="!isIdCheck" @click="idCheck(userData.id)">중복 검사</p>
        <p v-if="isIdCheck" @click="d">이메일 인증</p>
        <p v-if="isIdCheck">사용 가능한 아이디 입니다.</p>
        <p v-if="!isIdCheck && !isIdChecked">중복 검사를 해주세요.</p>
        <p v-if="!isIdCheck && isIdChecked">이미 있는 아이디 입니다.</p>
        <!-- 버튼으로 하면 form 제출되서 임시로 p로 해둠 -->
      </div>
      <div>
        <label for="password">비밀번호: </label>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          id="password"
          v-model="userData.password"
          @input="
            passwordDoubleCheck({
              password: userData.password,
              password2: password2,
            })
          "
        />
      </div>
      <div>
        <label for="password2">비밀번호 확인: </label>
        <input
          type="password"
          placeholder="비밀번호를 한 번 더 입력하세요"
          id="password2"
          v-model="password2"
          @input="
            passwordDoubleCheck({
              password: userData.password,
              password2: password2,
            })
          "
        />
        <p v-if="!isPasswordDoubleCheck && isPasswordDoubleChecked">
          비밀번호가 일치하지 않습니다
        </p>
        <p v-if="!isPasswordDoubleCheck && !isPasswordDoubleChecked">
          비밀번호 확인이 필요합니다
        </p>
      </div>
      <div>
        <label for="nickname">닉네임: </label>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          id="nickname"
          v-model="userData.nickname"
          @keydown="NICKNAME_CHECK(false)"
        />
        <p v-if="!isNicknameCheck" @click="nicknameCheck(userData.nickname)">
          중복 검사
        </p>
        <p v-if="!isIdCheck" @click="idCheck(userData.id)">중복 검사</p>
        <p v-if="isIdCheck" @click="d">이메일 인증</p>
        <p v-if="isIdCheck">사용 가능한 아이디 입니다.</p>
        <p v-if="!isIdCheck && !isIdChecked">중복 검사를 해주세요.</p>
        <p v-if="!isIdCheck && isIdChecked">이미 있는 아이디 입니다.</p>
      </div>

      <div>
        <label for="region">지역: </label>
        <select name="region" id="region" v-model="userData.region">
          <option v-for="reg in regionList" :key="reg">{{ reg }}</option>
        </select>
      </div>
      <div>
        <label for="userlang">사용 언어: </label>
        <select name="userlang" id="userlang" v-model="userData.language">
          <option v-for="userlan in languageList" :key="userlan">
            {{ userlan }}
          </option>
        </select>
      </div>
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
      <div>
        <label for="name">유저 이름: </label>
        <input
          type="text"
          placeholder="유저 이름을 입력하세요"
          id="name"
          v-model="userData.name"
        />
        <p>유저 이름은 공개되지 않으며, 비밀번호 찾기에 이용됩니다.</p>
      </div>
      <v-btn
        type="submit"
        v-bind:disabled="
          !isPasswordDoubleCheck || !isIdCheck || !isNicknameCheck
        "
      >
        회원가입
      </v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import SignUpCard from '@/components/Account/Signup/SignUpCard.vue';

export default {
  components: {
    SignUpCard,
  },
  data() {
    return {
      userData: {
        id: '',
        password: '',
        nickname: '',
        region: '',
        language: '',
        preferenceLanguage: '',
        name: '',
      },
      password2: '',
    };
  },
  computed: {
    ...mapGetters([
      'isPasswordDoubleCheck',
      'isPasswordDoubleChecked',
      'isIdCheck',
      'isIdChecked',
      'isNicknameCheck',
      'languageList',
      'regionList',
    ]),
  },
  methods: {
    ...mapActions([
      'signup',
      'passwordDoubleCheck',
      'idCheck',
      'nicknameCheck',
      'getLanguageList',
      'getRegionList',
    ]),
    ...mapMutations(['ID_CHECK', 'NICKNAME_CHECK']),
  },
  mounted() {
    this.getLanguageList();
    this.getRegionList();
  },
};
</script>

<style scoped></style>
