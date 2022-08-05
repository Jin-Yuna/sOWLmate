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
      <v-chip-group v-model="newRoom.interest" column>
        <v-chip v-for="interest in InterestList" :key="interest">
          {{ interest }}
        </v-chip>
      </v-chip-group>
      <input
        type="checkbox"
        id="checkbox"
        v-model="newRoom.locks"
        true-value="LOCK"
        false-value="UNLOCK"
      />
      <label for="checkbox">
        <p v-if="newRoom.locks === 'UNLOCK'">LOCK</p>
        <p v-if="newRoom.locks === 'LOCK'">UNLOCK</p>
      </label>
      <v-btn type="submit">생성</v-btn>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'RoomCreateForm',
  data() {
    return {
      newRoom: {
        title: '',
        ownerId: this.userInfo.id,
        interest: '',
        language: this.userInfo.language,
        locks: 'UNLOCK',
      },
    };
  },
  ...mapGetters(['userInfo']),
};
</script>

<style></style>
