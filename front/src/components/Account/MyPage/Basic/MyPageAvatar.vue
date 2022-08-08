<template>
  <div>
    <div v-if="profile">
      <img :src="profile" alt="프로필이미지" />
    </div>
    <input type="file" id="image" />
    <button @click="upload()">저장</button>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { mapGetters } from 'vuex';
import axios from 'axios';
import sowl from '@/api/sowl';

export default {
  data() {
    return {
      profile: '',
    };
  },
  computed: {
    ...mapGetters(['currentUser', 'userInfo']),
  },
  methods: {
    upload() {
      const storage = firebase.storage();
      var file = document.querySelector('#image').files[0];
      var storageRef = storage.ref();
      var spaceRef = storageRef.child('image/' + file.name);
      var uploading = spaceRef.put(file);
      uploading.on(
        'state_changed',
        // 변화시 동작하는 함수
        null,
        //에러시 동작하는 함수
        (error) => {
          console.error('프로필 업로드 실패:', error);
        },
        // 성공시 동작하는 함수
        () => {
          uploading.snapshot.ref.getDownloadURL().then((imgUrl) => {
            this.profile = imgUrl;
            axios({
              url: sowl.users.profile(),
              method: 'put',
              data: {
                userId: this.currentUser,
                profilePictureUrl: imgUrl,
              },
            })
              .then(() => {})
              .catch((error) => {
                console.log(error);
              });
          });
        },
      );
    },
  },
  mounted() {
    if (this.userInfo.profilePictureUrl) {
      console.log(this.userInfo.profilePictureUrl);
      this.profile = this.userInfo.profilePictureUrl;
    }
  },
};
</script>

<style></style>
