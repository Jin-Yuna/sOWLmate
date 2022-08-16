<template>
  <div>
    <HelloWorldBeforeLogin />
    <h1>로그인후</h1>
    <HelloWorld />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import HelloWorld from '../components/HelloWorld.vue';
import HelloWorldBeforeLogin from '@/components/HelloWorldBeforeLogin.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
    HelloWorldBeforeLogin,
  },
});
</script>
