<template>
  <v-container class="mt-3">
    <v-row justify="center" class="mt-16">
      <RoomListNavigation />
      <router-link :to="{ name: 'RoomCreateView' }">방 생성</router-link>
      <v-main>
        <router-view />
      </v-main>
    </v-row>
    <RoomRandomButton />
  </v-container>
</template>

<script>
import RoomListNavigation from '@/components/Room/RoomListNavigation.vue';
import RoomRandomButton from '@/components/Room/Home/RoomRandomButton.vue';

export default {
  name: 'RoomMainView',
  components: { RoomListNavigation, RoomRandomButton },
  methods: {},
};
</script>

<style scoped></style>
