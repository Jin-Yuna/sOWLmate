<template>
  <div>
    <router-link to="/">Home</router-link>
    <div v-if="!isLoggedIn">
      <router-link :to="{ name: 'LoginView' }"><button>Login</button></router-link> |
      <router-link :to="{ name: 'SignUpView' }"><button>Signup</button></router-link>
    </div>
    <div v-if="isLoggedIn">
    <router-link :to="{ name: 'LogoutView' }"><button>Logout</button></router-link> |
    <router-link :to="{ name: 'MyPageBasicView' }"><button>My Page</button></router-link>
    </div>
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


<style scoped></style>
