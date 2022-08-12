<template>
  <div>
    <router-link :to="{ name: 'MyPageBasicInfoView' }">마이페이지</router-link>
    |
    <router-link :to="{ name: 'MyPageEditPasswordView' }"
      >비밀번호 수정</router-link
    >
    |
    <router-link :to="{ name: 'MypageEditInterestView' }"
      >관심사 수정</router-link
    >
    |
    <router-link :to="{ name: 'MyPageEditLanguageView' }"
      >언어 수정</router-link
    >
    |
    <router-link :to="{ name: 'MyPageEditPreferenceLanguageView' }"
      >선호 언어 수정</router-link
    >
    |
    <router-link :to="{ name: 'PhotoBoothView' }">사진첩</router-link>
  </div>
</template>

<script>
export default {
  name: 'MyPageNavigation',
  components: {},
  computed: {},
};
</script>

<style scoped></style>
