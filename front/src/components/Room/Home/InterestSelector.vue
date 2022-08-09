<template>
  <div>
    <h5>나의 관심사</h5>
    <div v-if="userInterest.length === 0">
      <p>관심사를 먼저 선택해야 이용 가능합니다.</p>
      <router-link :to="{ name: 'MypageEditInterestView' }"
        >관심사 선택하러 가기</router-link
      >
    </div>
    <div v-else>
      <v-chip @click="allCheck()">All</v-chip>
      <v-chip-group
        v-if="!isEditInterest"
        v-model="roomInterest"
        @click="roomInterestCheck()"
        column
        multiple
      >
        <v-chip v-for="interest in userInterest" :key="interest">
          {{ interest }}
        </v-chip>
      </v-chip-group>
      <v-btn @click="editInterest()">관심사 수정</v-btn>
      <InterestEditForm v-if="isEditInterest" />
      <v-btn @click="editInterest()" v-if="isEditInterest">닫기</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import InterestEditForm from '@/components/Account/MyPage/InterestEditForm.vue';

export default {
  name: 'InterestSelector',
  components: {
    InterestEditForm,
  },
  data() {
    return {
      userInterest: [],
      isEditInterest: false,
      roomInterest: [],
      roomList: [],
      isAllCheck: true,
    };
  },
  computed: {
    ...mapGetters([
      'InterestList',
      'userInfo',
      'roomInterests',
      'roomByInterestLanguage',
    ]),
  },
  methods: {
    ...mapActions(['createRoom', 'getRoomList']),
    ...mapMutations(['ROOM_INTERESTS', 'ROOM_BY_INTEREST_LANGUAGE']),
    userInfoCheck() {
      for (const userinterest of this.userInfo.interests) {
        if (this.InterestList.includes(userinterest['title'])) {
          this.userInterest.push(userinterest['title']);
        }
      }
    },
    editInterest() {
      this.isEditInterest = !this.isEditInterest;
    },
    allCheck() {
      if (this.isAllCheck) {
        this.roomList = [];
        console.log(this.userInterest);
        for (const interest of this.userInterest) {
          this.getRoomList({
            language: this.userInfo.preferenceLanguage,
            interest: interest,
          });
          console.log('여기2', this.roomByInterestLanguage);
          this.roomList.push(this.roomByInterestLanguage);
          console.log('여기3', this.roomList);
        }
        console.log('여기4', this.roomList);
        this.ROOM_BY_INTEREST_LANGUAGE(this.roomList);
      } else {
        this.roomList = [];
      }
      this.isAllCheck = !this.isAllCheck;
    },
    roomInterestCheck() {
      this.roomList = [];
      let current = [];
      for (let index of this.roomInterest) {
        current.push(this.userInterest[index]);
      }
      this.ROOM_INTERESTS(current);
      for (const interest of this.roomInterests) {
        this.getRoomList({
          language: this.userInfo.preferenceLanguage,
          interest: interest,
        });
        this.roomList.push(this.roomByInterestLanguage);
      }
      this.ROOM_BY_INTEREST_LANGUAGE(this.roomList);
    },
  },
  mounted() {
    this.userInfoCheck();
    this.allCheck();
  },
};
</script>

<style></style>
