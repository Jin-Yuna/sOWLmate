<template>
  <div></div>
</template>

<script>
export default {
  name: 'GoogleLoginView',
  setup() {
    let googleCode = new URL(window.location.href).searchParams.get('code');
    console.log(googleCode);
  },
};
</script>

<style></style>
