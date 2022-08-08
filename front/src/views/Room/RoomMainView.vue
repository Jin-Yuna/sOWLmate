<template>
  <div>
    <h1>RoomMainView.vue</h1>
    <RoomNavigation />
    <router-link :to="{ name: 'RoomCreateView' }">방 생성</router-link>
  </div>
</template>

<script>
import RoomNavigation from '@/components/Room/RoomNavigation.vue';

export default {
  name: 'RoomMainView',
  components: { RoomNavigation },
  methods: {},
};
</script>

<style></style>
