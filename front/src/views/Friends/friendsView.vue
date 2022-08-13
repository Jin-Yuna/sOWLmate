<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="3">
        <p>메모리네브바</p>
      </v-col>
      <v-col cols="9">
        <TotalFriend />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TotalFriend from '@/components/Friend/TotalFriend.vue';
import { mapActions } from 'vuex';

export default {
  name: 'friendsView',
  components: {
    TotalFriend,
  },
  methods: {
    ...mapActions(['totalFriendList']),
  },
  mounted() {
    console.log('토탈프~');
    this.totalFriendList();
  },
};
</script>

<style></style>
