<template>
  <div>
    <TotalFriend />
  </div>
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
    this.totalFriendList();
  },
};
</script>

<style></style>
