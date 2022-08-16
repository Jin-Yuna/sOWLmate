<template>
  <div>
    <form @submit.prevent="signup(userData)">
      <!-- 아이디 관련 -->
      <div>
        <label for="id">아이디 : </label>
        <input
          type="email"
          placeholder="아이디(이메일)를 입력하세요"
          id="id"
          v-model="userData.id"
          @input="resetId()"
        />
        <!-- 중복 검사 -->
        <p v-if="!isIdChecked" @click="idCheck(userData.id)">중복 검사</p>
        <p v-if="!isIdChecked">중복 검사를 해주세요.</p>
        <p v-if="!isEmailValidCheck && isIdCheck">이메일 형식이 아닙니다.</p>
        <p v-if="!isIdCheck && isIdChecked">이미 있는 아이디 입니다.</p>
        <p v-if="isIdCheck && isEmailValidCheck && !authentication_check">
          사용 가능한 아이디 입니다. 이메일 인증을 해주세요.
        </p>
        <!-- 이메일 인증 -->
        <p
          v-if="isIdCheck && isEmailValidCheck && isIdEmailCheck === ''"
          @click="idEmailCheck(userData.id)"
        >
          이메일 인증
        </p>
        <label
          for="emailNum"
          v-if="isIdEmailCheck != '' && !authentication_check"
          >인증 번호 입력 :
        </label>
        <input
          type="text"
          placeholder="인증번호를 입력하세요"
          id="emailNum"
          v-if="isIdEmailCheck != '' && !authentication_check"
          v-model="authentication_num"
        />
        <p
          v-if="
            isIdCheck &&
            isEmailValidCheck &&
            isIdEmailCheck != '' &&
            !authentication_check
          "
          @click="authenticationNum(isIdEmailCheck)"
        >
          확인
        </p>
        <p
          v-if="
            isIdCheck &&
            isEmailValidCheck &&
            isIdEmailCheck != '' &&
            !authentication_check
          "
          @click="idEmailCheck(userData.id)"
        >
          재요청
        </p>
        <p v-if="authentication_check">인증이 완료되었습니다.</p>
        <p v-if="authentication_checked && !authentication_check">
          인증 번호가 틀렸습니다.
        </p>
      </div>
      <!-- 비밀번호 -->
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
      <!-- 비밀번호 확인 -->
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
      <!-- 유저 이름 -->
      <div>
        <label for="name">유저 이름: </label>
        <input
          type="text"
          placeholder="유저 이름을 입력하세요"
          id="name"
          v-model="userData.name"
        />
        <p v-if="userData.name === ''">유저 이름을 입력해주세요.</p>
        <p>유저 이름은 공개되지 않으며, 비밀번호 찾기에 이용됩니다.</p>
      </div>
      <!-- 회원 가입 버튼 -->
      <v-btn
        type="submit"
        v-bind:disabled="
          !isPasswordDoubleCheck ||
          !authentication_check ||
          !isNicknameCheck ||
          userData.name === ''
        "
      >
        회원가입
      </v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
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
      authentication_num: '',
      authentication_check: false,
      authentication_checked: false,
    };
  },
  computed: {
    ...mapGetters([
      'isPasswordDoubleCheck',
      'isPasswordDoubleChecked',
      'isIdCheck',
      'isIdChecked',
      'isEmailValidCheck',
      'isNicknameCheck',
      'isIdEmailCheck',
      'languageList',
      'regionList',
    ]),
  },
  methods: {
    ...mapActions([
      'signup',
      'passwordDoubleCheck',
      'idCheck',
      'emailValidCheck',
      'nicknameCheck',
      'idEmailCheck',
      'getLanguageList',
      'getRegionList',
    ]),
    ...mapMutations(['ID_CHECKED', 'ID_CHECK', 'ID_EMAIL_CHECK']),
    resetId() {
      this.ID_CHECKED(false);
      this.ID_CHECK(false);
      this.ID_EMAIL_CHECK('');
      this.emailValidCheck(this.userData.id);
      this.authentication_check = false;
      this.authentication_checked = false;
    },
    authenticationNum(isIdEmailCheck) {
      this.authentication_checked = true;
      if (this.authentication_num === isIdEmailCheck) {
        this.authentication_check = true;
        return;
      }
    },
  },
  mounted() {
    this.getLanguageList();
    this.getRegionList();
  },
};
</script>

<style scoped></style>
