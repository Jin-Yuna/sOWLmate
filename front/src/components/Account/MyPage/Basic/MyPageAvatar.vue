<template>
<div>
  <div v-if="images">
    <img :src="images" alt="image">
  </div>
  <div v-else @click="clickInputTag()">
    <img src="https://via.placeholder.com/150" alt="profile image">
    <label for="image">수정하기</label>
    <div v-show="false">
      <input ref="image" id="image" type="file" name="image" accept="image/*" @change="uploadImage()">
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
 
export default {
  data: ()=>({
    images: ''
  }),
  methods: {
    uploadImage() {
      this.images = this.$refs.image.files
      console.log(this.images)
      axios({})
    }
  }
}
</script>

<style>

</style>