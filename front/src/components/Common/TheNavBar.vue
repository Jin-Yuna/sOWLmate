<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/auth/login" v-if="!isLoggedIn">
      <button>Login</button>
    </router-link>
    <router-link to="/auth/logout" v-if="isLoggedIn">
      <button>Logout</button>
    </router-link>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'TheNavBar',
    components: {
    },
    computed: {
      ...mapGetters(['isLoggedIn']),
    },
  }
</script>


<style scoped>
</style>
