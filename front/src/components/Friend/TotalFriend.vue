<template>
  <div>
    <PreFriend :preFriendsList="this.preFriendsList" />
  </div>
</template>

<script>
import PreFriend from '@/components/Friend/PreFriend.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    PreFriend,
  },
  computed: {
    ...mapGetters(['preFriendsList', 'friendsList', 'sowlmateList']),
  },
};
</script>

<style></style>
