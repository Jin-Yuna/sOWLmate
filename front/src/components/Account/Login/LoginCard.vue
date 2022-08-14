<template>
  <div>
    <h1 class="text-gradient greeting">Welcome Back!</h1>
    <PlaneAnimation class="plane-position" />
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
  top: 4rem;
  left: -6rem;
  width: 50rem;
  height: 100%;
  overflow: hidden;
}

.login-img {
  max-width: 100%;
  height: auto;
  display: block;
}

.plane-position {
  position: relative;
  left: -20rem;
  top: 10rem;
}
</style>
