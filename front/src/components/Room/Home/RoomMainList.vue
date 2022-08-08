<template>
  <v-container>
    <v-row justify="center">
      <v-col v-for="room in roomByInterestLanguage" :key="room.id">
        <RoomListCard :room="room" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RoomListCard from '@/components/Room/RoomListCard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'RoomMainList',
  components: { RoomListCard },
  computed: {
    ...mapGetters(['roomByInterestLanguage']),
  },
};
</script>

<style></style>
