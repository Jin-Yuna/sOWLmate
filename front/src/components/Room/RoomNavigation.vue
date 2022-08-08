<template>
  <div>
    <router-link :to="{ name: 'RoomMainListView' }">모두 보기</router-link>
    |
    <router-link :to="{ name: 'RoomFriendsListView' }"
      >내 친구의 방</router-link
    >
    |
    <router-link :to="{ name: 'RoomInterestListView' }">관심사 별</router-link>
    |
    <router-link :to="{ name: 'RoomLanguageListView' }">언어 별</router-link>
  </div>
</template>

<script>
export default {
  name: 'RoomNavigation',
  components: {},
  computed: {},
};
</script>

<style scoped></style>
