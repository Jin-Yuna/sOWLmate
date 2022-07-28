<template>
<div>
  <div v-if="uploadItemImage">
    <label for="uploadItemFile">
      <div class="wrapper-image" >
        <img ref="uploadItemImage">
      </div>      
    </label>
  </div>
  <div v-else @click="clickInputTag()">
    <img src="https://via.placeholder.com/150" alt="profile image">
    <div class="itemFileBox" ref="itemFileBox">
    <label for="uploadItemFile"></label>
    <input 
          type="file" 
          class="item-file-image" 
          id="uploadItemFile" 
          ref="uploadItemFile"
          @change="onFileSelected"
          accept="image/*"
    />
  </div>
  </div>
<!-- 출처: https://avengersrhydon1121.tistory.com/280 [익명의 개발노트:티스토리] -->
</div>
</template>

<script>
import axios from 'axios'
 
export default {
  data: ()=>({
    imageData: null,
    picture: null,
    uploadValue: 0
  }),
  methods: {
    uploadImage() {
      this.images = this.$refs.image.files
      console.log(this.images)
      axios({})
    },
   onFileSelected(event){
      let image = event.target;

      if(image.files[0]){
                
        let itemImage = this.$refs.uploadItemImage; //img dom 접근
        
        itemImage.src = window.URL.createObjectURL(image.files[0]);//img src에 blob주소 변환
        
        this.itemImageInfo.uploadImages = itemImage.src; //이미지 주소 data 변수에 바인딩해서 나타내게 처리
        
        itemImage.width ='200'; // 이미지 넓이
        
        itemImage.onload = () => {
          window.URL.revokeObjectURL(this.src)  //나중에 반드시 해제해주어야 메모리 누수가 안생김.
        }
     
      }
    }
  },
}
</script>

<style>

</style>