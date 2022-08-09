<template>
  <div>
    <!-- <h2 v-if="user">Logged in user: {{ user }}</h2>

    <button
      @click="handleSignIn"
      :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized"
    >
      Google 로그인
    </button>
    <button @click="handleSignOut" :disabled="!Vue3GoogleOauth.isAuthorized">
      Sign Out
    </button> -->
  </div>
</template>

<script>
// import { inject } from 'vue';
// export default {
//   name: 'GoogleLogin',
//   data() {
//     return {
//       user: '',
//     };
//   },
//   methods: {
//     async handleSignIn() {
//       try {
//         const googleUser = await this.$gAuth.signIn();
//         // console.log(this.$gAuth.signIn);
//         if (!googleUser) {
//           return null;
//         }
//         this.user = googleUser.getBasicProfile().getEmail();
//         console.log('아마도 리스폰스받은거', googleUser);
//       } catch (error) {
//         console.log(error);
//         return null;
//       }
//     },
//     async handleSignOut() {
//       try {
//         await this.$gAuth.signOut();
//         // console.log(this.$gAuth.signOut);
//         this.user = '';
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   },
//   setup() {
//     const Vue3GoogleOauth = inject('Vue3GoogleOauth');
//     return {
//       Vue3GoogleOauth,
//     };
//   },
// };
</script>

<style scoped></style>
