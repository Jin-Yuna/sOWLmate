<template>
  <div>
    <button class="main-btn" @click="randomRoom()">RANDOM</button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'roomAll',
      'roomByInterest',
      'roomByLanguage',
      'roomByInterestLanguage',
      'userInfo',
      'userList',
      'InterestList',
    ]),
    ...mapMutations(['TO_USER_NICKNAME', 'FROM_USER_NICKNAME']),
  },
  data() {
    return {
      userData: {
        userId: '',
        conferenceNo: '',
      },
      room: {},
    };
  },
  methods: {
    ...mapActions(['joinRoom']),
    randomRoom() {
      this.FROM_USER_NICKNAME(this.userInfo.nickname);
      this.userDta.userId = this.userInfo.id;
      var conference;
      if (this.roomByInterestLanguage.length != 0) {
        conference = Math.floor(
          Math.random() * this.roomByInterestLanguage.length,
        );
        this.userData.conferenceNo =
          this.roomByInterestLanguage[conference].conferenceNo;

        this.room = this.roomByInterestLanguage[conference];
        for (const user of this.userList) {
          if (this.room.ownerId === user['id']) {
            this.TO_USER_NICKNAME(user['nickname']);
            break;
          }
        }
        return this.joinRoom(this.userData);
      } else if (this.roomByInterest.length != 0) {
        conference = Math.floor(Math.random() * this.roomByInterest.length);
        this.userData.conferenceNo =
          this.roomByInterest[conference].conferenceNo;

        this.room = this.roomByInterest[conference];
        for (const user of this.userList) {
          if (this.room.ownerId === user['id']) {
            this.TO_USER_NICKNAME(user['nickname']);
            break;
          }
        }
        return this.joinRoom(this.userData);
      } else if (this.roomByLanguage.length != 0) {
        conference = Math.floor(Math.random() * this.roomByInterest.length);
        this.userData.conferenceNo =
          this.roomByLanguage[conference].conferenceNo;

        this.room = this.roomByLanguage[conference];
        for (const user of this.userList) {
          if (this.room.ownerId === user['id']) {
            this.TO_USER_NICKNAME(user['nickname']);
            break;
          }
        }
        return this.joinRoom(this.userData);
      } else {
        conference = Math.floor(Math.random() * this.roomAll.length);
        this.userData.conferenceNo = this.roomAll[conference].conferenceNo;

        this.room = this.roomAll[conference];
        for (const user of this.userList) {
          if (this.room.ownerId === user['id']) {
            this.TO_USER_NICKNAME(user['nickname']);
            break;
          }
        }
        return this.joinRoom(this.userData);
      }
    },
  },
};
</script>

<style scoped>
.main-btn {
  width: 10rem;
}
</style>
