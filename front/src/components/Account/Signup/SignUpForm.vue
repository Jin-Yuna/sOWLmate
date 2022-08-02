<template>
  <div>
    <SignUpCard />
    <form @submit.prevent="signup(userData)">
      <div>
        <label for="id">이메일: </label>
        <input
          type="email"
          id="id"
          v-model="userData.id"
          @keydown="idCheckFalse()"
        />
        <p @click="idCheck()">중복검사</p>
        <p v-if="idChecked">사용 가능한 이메일입니다.</p>
        <p v-if="!idChecked">중복검사를 해주세요</p>
        <!-- 버튼으로 하면 form 제출되서 임시로 p로 해둠 -->
      </div>
      <div>
        <label for="password">비밀번호: </label>
        <input
          type="password"
          id="password"
          v-model="userData.password"
          @keyup="
            passwordDoubleCheck({
              password: userData.password,
              password2: userData.password2,
            })
          "
        />
      </div>
      <div>
        <label for="password2">비밀번호 확인: </label>
        <input
          type="password"
          id="password2"
          v-model="userData.password2"
          @keyup="
            passwordDoubleCheck({
              password: userData.password,
              password2: userData.password2,
            })
          "
        />
        <p v-if="!isPasswordDoubleCheck">비밀번호가 일치하지 않습니다</p>
      </div>
      <div>
        <label for="nickname">닉네임: </label>
        <input
          type="text"
          id="nickname"
          v-model="userData.nickname"
          @keydown="NICKNAME_CHECK(false)"
        />
        <p @click="nicknameCheck(userData.nickname)">중복검사</p>
        {{ userData.nickname }}
      </div>
      <div>
        <label for="region">지역: </label>
        <select name="region" id="region" v-model="userData.region">
          <option v-for="reg in regions" :key="reg">{{ reg }}</option>
        </select>
      </div>
      <div>
        <label for="lang">언어: </label>
        <select name="lang" id="lang" v-model="userData.lang">
          <option v-for="lan in languageList" :key="lan">{{ lan }}</option>
        </select>
      </div>
      <button v-if="isPasswordDoubleCheck && idChecked && isNicknameCheck">
        회원가입
      </button>
    </form>
    <router-link :to="{ name: 'LoginView' }">이미 회원이신가요?</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import sowl from '@/api/sowl';
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
        lang: '',
        password: '',
        password2: '',
        nickname: '',
        region: '',
      },
<<<<<<< HEAD
      regions: [
          'KOREA',
          'JAPAN',
          'CHINA',
          'UK',
      ],  
      idChecked : false,
    }
  },
  computed: {
    ...mapGetters(['isPasswordDoubleCheck', 'isNicknameCheck', 'languageList'])
=======
      regions: ['KOREA', 'JAPAN', 'CHINA', 'UK'],
      languages: ['KOREAN', 'KOREAN'],
      idChecked: false,
    };
  },
  computed: {
    ...mapGetters(['isPasswordDoubleCheck', 'isNicknameCheck']),
>>>>>>> 63d684f47cf21f705d97729b7deae6f16bed2b5b
  },
  methods: {
    ...mapActions(['signup', 'passwordDoubleCheck', 'nicknameCheck', 'getLanguageList']),
    ...mapMutations(['NICKNAME_CHECK']),
    // id는 변경이 안되니까 id중복체크도 쓸 곳이 회원가입 폼 뿐인 것 같아서 여기다 id중복체크 만듦
    idCheck() {
      axios({
        url: `${sowl.users.users()}${this.userData.id}`,
        method: 'get',
      })
        .then((response) => {
          console.log(response);
          if (response.data != 'exist') {
            this.idChecked = true;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    idCheckFalse() {
      this.idChecked = false;
    },
  },
<<<<<<< HEAD
  mounted() {
    this.getLanguageList()
  }
}
=======
};
>>>>>>> 63d684f47cf21f705d97729b7deae6f16bed2b5b
</script>

<style scoped></style>
