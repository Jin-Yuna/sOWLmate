<template>
  <header class="l-header">
    <div class="nav bd-grid">
      <div class="nav__logo">
        <router-link to="/">
          <embed
            :src="require('@/assets/sowlImage/full_logo.svg')"
            type="image/svg+xml"
            class="logo my-3"
            contain
            height="20"
          />
        </router-link>
      </div>
      <!-- <router-link to="/">Home</router-link> -->
      <div class="nav__menu" id="nav-menu">
        <ul class="nav__list">
          <li v-if="!isLoggedIn" class="nav__item">
            <router-link :to="{ name: 'LoginView' }">Login</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav__item">
            <router-link :to="{ name: 'SignUpView' }">SignUp</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav__item">
            <router-link :to="{ name: 'RoomMainListView' }">Room</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav__item">
            <router-link :to="{ name: 'LogoutView' }">Logout</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav__item">
            <router-link :to="{ name: 'MyPageBasicInfoView' }"
              >My Page</router-link
            >
          </li>
          <li v-if="isLoggedIn" class="nav__item">
            <router-link :to="{ name: 'friendsView' }">친구</router-link>
          </li>
        </ul>
      </div>
      <div class="nav__toggle" id="nav-toggle">
        <i class="bx bx-menu">=</i>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheNavBar',
  components: {},
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/layout/mainNav.scss';
</style>
