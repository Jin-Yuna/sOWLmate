<template>
  <div>
    <div>
      <v-row>
        <h2>PRE-FRIENDS</h2>
        <v-chip variant="outlined" size="x-small" class="ml-10 mt-2"
          >펜팔 가능</v-chip
        >
      </v-row>
      <br />
      <p>나와 한 번 이상 만난 적 있는, 나의 friends가 될 예비친구들입니다.</p>
      <br />
      <p>
        예비 친구에게 편지를 통해, 혹은 화상 미팅을 통해 만남을 갖고, 친밀도를
        쌓아 friends가 되어 보세요!
      </p>
      <p>friends가 되면, 프로필이 공개되고 나의 친구 목록에 추가됩니다.</p>
    </div>
    <div>
      <PreFriend :preFriendsList="this.preFriendsList" />
    </div>
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

<style scoped></style>
