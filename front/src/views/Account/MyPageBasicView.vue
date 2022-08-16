<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <MyPageNavigation />
      </v-col>
      <v-col cols="10">
        <v-main>
          <router-view />
        </v-main>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MyPageNavigation from '@/components/Account/MyPage/MyPageNavigation.vue';

export default {
  name: 'MyPageBasicView',
  components: {
    MyPageNavigation,
  },
};
</script>

<style></style>
