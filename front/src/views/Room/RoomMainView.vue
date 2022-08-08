<template>
  <div>
    <h1>RoomMainView.vue</h1>
    <RoomListNavigation />
    <router-link :to="{ name: 'RoomCreateView' }">방 생성</router-link>
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import RoomListNavigation from '@/components/Room/RoomListNavigation.vue';

export default {
  name: 'RoomMainView',
  components: { RoomListNavigation },
  methods: {},
};
</script>

<style></style>
