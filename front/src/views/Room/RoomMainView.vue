<template>
  <v-container class="mt-14">
    <v-row>
      <v-col cols="4">
        <RoomListNavigation class=".mypage-nav-position" />
      </v-col>
      <v-col cols="8">
        <button class="sub-btn main-btn-size" id="button-check">
          <router-link :to="{ name: 'RoomCreateView' }">방 생성</router-link>
        </button>
        <button class="main-btn main-btn-size">
          <RoomRandomButton />
        </button>
        <v-main> <router-view class="view" /></v-main>
      </v-col>
    </v-row>
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

<style scoped>
.view {
  margin-bottom: 2.5rem;
}
.mypage-nav-position {
  left: 16rem;
}
.auth-q {
  font-size: 0.8rem;
}
.main-sub-card {
  position: fixed;
  width: 10rem;
  height: 10rem;
}
.main-chip {
  height: 2rem;
  width: 8rem;
  border-radius: 4rem;
}
.card-group-pisiton {
  position: relative;
  left: -4rem;
}
.main-btn-size {
  width: 12rem;
  height: 3rem;
}

#button-check {
  margin-right: 3rem;
}
</style>
