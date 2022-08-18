<template>
  <div class="wrap">
    <div class="postcard">
      <div class="letter">
        <LetterInput />
      </div>
    </div>
  </div>
</template>

<script>
import LetterInput from '@/components/Letter/LetterInput.vue';

export default {
  name: 'LetterCreateView',
  components: {
    LetterInput,
  },
};
</script>

<style scoped>
.postcard {
  width: 800px;
  height: 500px;
  background-color: #f7f7f7;
  margin: 0 auto;
  border-radius: 2%;
  display: flex;
  justify-content: space-between;
  padding: 3em;
  box-shadow: 0.8em 0.8em 15px rgba(0, 0, 0, 0.3);
  -ms-transform: rotate(2.5deg); /* IE 9 */
  -webkit-transform: rotate(2.5deg); /* Chrome, Safari, Opera */
  transform: rotate(2.5deg);
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

/*animation*/
.postcard:hover,
.postcard:active,
.postcard:focus {
  -ms-transform: rotate(0deg); /* IE 9 */
  -webkit-transform: rotate(0deg); /* Chrome, Safari, Opera */
  transform: rotate(0deg);
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
</style>
