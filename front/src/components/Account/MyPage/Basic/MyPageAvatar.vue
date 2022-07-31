<template>
  <div>
    <input type="file" id="image">
    <button @click="upload()">저장</button>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

export default {
  methods: {
    upload() {
      const storage = firebase.storage();
      var file = document.querySelector('#image').files[0];
      var storageRef = storage.ref();
      var spaceRef = storageRef.child('image/' +  file.name);
      spaceRef.put(file).then((snapshot)=> {
        console.log('uploaded', snapshot)
      })
    }
  }
}
</script>

<style>

</style>