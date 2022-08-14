<template>
  <div>
    <h1 class="text-gradient pw-b">Welcome Back!</h1>
    <PlaneAnimation />
    <LoginDeco class="login-deco-position" />
    <div class="img-container">
      <v-img
        :src="require('@/assets/sowlImage/login_sowl.svg')"
        class="login-img"
      />
    </div>
  </div>
</template>

<script>
import PlaneAnimation from '@/components/Account/Login/PlaneAnimation.vue';
import LoginDeco from '@/components/Account/Login/LoginDeco.vue';
export default {
  components: {
    PlaneAnimation,
    LoginDeco,
  },
};
</script>

<style scoped>
.login-deco-position {
  position: absolute;
  left: -40rem;
  top: -1rem;
  overflow: hidden;
}
.img-container {
  position: relative;
  top: 2rem;
  width: 50rem;
  height: 100%;
  overflow: hidden;
}

.login-img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
