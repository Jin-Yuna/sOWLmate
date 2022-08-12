<template>
  <div>
    <h1>Photo Booth</h1>
    <button @click="getPhotos">사진불러오기</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import sowl from '@/api/sowl.js';
import axios from 'axios';

export default {
  name: 'PhotoBoothView',
  components: {},
  methods: {
    getPhotos() {
      console.log(this.currentUser);
      console.log(sowl.photoBooth.userPhotos());
      axios
        .get(`${sowl.photoBooth.userPhotos()}`, {
          headers: {
            userId: this.currentUser,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
};
</script>

<style></style>
