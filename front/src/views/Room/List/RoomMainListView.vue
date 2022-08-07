<template>
  <div>
    <h3>RoomMainListView.vue</h3>
    <InterestSelector />
    <p>선호 언어 : {{ userInfo.preferenceLanguage }}</p>
    <router-link :to="{ name: 'MyPageEditLanguageView' }"
      >선호 언어 수정</router-link
    >
    <v-container>
      <v-row justify="center">
        <v-col v-for="room in roomByInterestLanguage" :key="room.id">
          <RoomListCard :room="room" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RoomListCard from '@/components/Room/RoomListCard.vue';
import InterestSelector from '@/components/Room/Home/InterestSelector.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'RoomMainListView',
  components: { InterestSelector, RoomListCard },
  computed: {
    ...mapGetters(['userInfo', 'roomInterests', 'roomByInterestLanguage']),
  },
};
</script>

<style></style>
