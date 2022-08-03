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
import sowl from '@/api/sowl';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      profile: '',
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
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
        null,
        (error) => {
          console.error('프로필 업로드 실패:', error);
        },
        () => {
          uploading.snapshot.ref.getDownloadURL().then((imgurl) => {
            this.profile = imgurl;
            const data = JSON.stringifyt(imgurl);
            console.log(data);
            axios({
              url: sowl.users.profile(this.currentUser),
              method: 'put',
              data,
              // data: JSON.stringify(this.profile)
            })
              .then((response) => {
                console.log('db에저장', response);
              })
              .catch((error) => {
                console.log(error);
              });
          });
        },
      );
    },
  },
};
</script>

<style></style>
