<template>
  <div>
    <form>
      <label for="title">제목: </label>
      <input
        type="text"
        placeholder="방 제목을 입력해주세요."
        id="title"
        v-model="newRoom.title"
      />
      <h4>내 관심사 중 하나만 선택 가능합니다!</h4>
      <v-chip-group v-model="newRoom.interest" color="000000" column>
        <v-chip v-for="interest in userInterest" :key="interest">
          {{ interest }}
        </v-chip>
      </v-chip-group>
      <div>
        <input
          type="checkbox"
          id="checkbox"
          true-value="LOCK"
          false-value="UNLOCK"
          v-model="newRoom.locks"
          @click="lockCheck()"
        />
        <label for="checkbox" v-if="newRoom.locks === 'UNLOCK'"> LOCK </label>
        <label for="checkbox" v-if="newRoom.locks === 'LOCK'"> UNLOCK </label>
      </div>
      <div>
        <label for="password" v-if="newRoom.locks === 'LOCK'"
          >방 비밀번호 :
        </label>
        <input
          type="text"
          placeholder="방 비밀번호를 지정해주세요."
          id="password"
          v-if="newRoom.locks === 'LOCK'"
          v-model="newRoom.password"
        />
      </div>
      <v-btn type="submit" :disabled="!newRoom.title">생성</v-btn>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RoomCreateForm',
  data() {
    return {
      newRoom: {
        title: '',
        ownerId: '',
        interest: '',
        language: '',
        locks: 'UNLOCK',
        password: '',
      },
      userInterest: [],
    };
  },
  computed: {
    ...mapGetters(['InterestList', 'userInfo']),
  },
  methods: {
    ...mapActions(['userInterestSave']),
    interestCheck() {
      for (const userinterest of this.userInfo.interests) {
        if (this.InterestList.includes(userinterest['title'])) {
          this.userInterest.push(userinterest['title']);
        }
      }
    },
    userInfoCheck() {
      this.userInfo.id = this.newRoom.ownerId;
      this.userInfo.language = this.newRoom.languagec;
    },
    lockCheck() {
      let lock = this.newRoom.locks;
      if (lock === 'LOCK') {
        lock = 'UNLOCK';
      } else {
        lock = 'LOCK';
      }
    },
  },
  mounted() {
    this.interestCheck();
    this.userInfoCheck();
  },
};
</script>

<style></style>
