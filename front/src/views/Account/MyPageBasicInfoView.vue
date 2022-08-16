<template>
  <div>
    <h2>기본 정보</h2>
    <MyPageAvatar :profilePictureUrl="this.userInfo.profilePictureUrl" />
    <MyPageBasicInfoForm />
    <button @click="withdrawal">탈퇴</button>
  </div>
</template>

<script>
import MyPageAvatar from '@/components/Account/MyPage/Basic/MyPageAvatar.vue';
import MyPageBasicInfoForm from '@/components/Account/MyPage/Basic/MyPageBasicInfoForm.vue';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import sowl from '@/api/sowl';

export default {
  name: 'MyPageBasicInfoView',
  components: {
    MyPageAvatar,
    MyPageBasicInfoForm,
  },
  methods: {
    ...mapActions(['logout']),
    withdrawal() {
      axios({
        url: sowl.users.users(),
        method: 'delete',
        data: {
          userId: this.currentUser,
        },
      })
        .then(() => {
          alert('성공적으로 탈퇴하였습니다');
          this.logout();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  computed: {
    ...mapGetters(['currentUser', 'userInfo']),
  },
};
</script>

<style></style>
