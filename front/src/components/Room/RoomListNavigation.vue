<template>
  <v-col cols="3" class="room-nav">
    <v-tabs v-model="tab" direction="vertical" color="primary">
      <v-tab>
        <router-link :to="{ name: 'RoomMainListView' }"
          >전체 유저 방 조회</router-link
        >
      </v-tab>
      <v-tab>
        <router-link :to="{ name: 'RoomFriendsListView' }"
          >친구 방 조회</router-link
        >
      </v-tab>
    </v-tabs>
  </v-col>
</template>

<script>
export default {
  name: 'RoomListNavigation',
  components: {},
  computed: {},
};
</script>

<style scoped>
.room-nav {
  margin-left: 7rem;
}
</style>
