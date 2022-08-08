<template>
  <div>
    <h3>RoomMainListView.vue</h3>
    <InterestSelector />
    <p>선호 언어 : {{ userInfo.preferenceLanguage }}</p>
    <router-link :to="{ name: 'MyPageEditLanguageView' }"
      >선호 언어 수정</router-link
    >
    <RoomMainList />
  </div>
</template>

<script>
import RoomMainList from '@/components/Room/Home/RoomMainList.vue';
import InterestSelector from '@/components/Room/Home/InterestSelector.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'RoomMainListView',
  components: { InterestSelector, RoomMainList },
  computed: {
    ...mapGetters(['userInfo', 'roomInterests']),
  },
};
</script>

<style></style>
