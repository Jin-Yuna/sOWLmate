<template>
  <div>
    <router-link :to="{ name: 'RoomMainListView' }">모두 보기</router-link>
    |
    <router-link :to="{ name: 'RoomFriendsListView' }"
      >내 친구의 방</router-link
    >
  </div>
</template>

<script>
export default {
  name: 'RoomListNavigation',
  components: {},
  computed: {},
};
</script>

<style scoped></style>
