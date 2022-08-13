<template>
  <v-container class="mt-3">
    <v-row justify="center" class="mt-16">
      <v-col cols="3">
        <p>메모리네브 자리</p>
      </v-col>
      <v-col cols="9">
        <v-row class="friend-nav"
          ><p @click="selected = 0">
            전체 <span v-if="selected === 0"><hr /></span>
          </p>
          <p @click="selected = 1">
            예비친구<span v-if="selected === 1"><hr /></span>
          </p>
          <p @click="selected = 2">
            친구<span v-if="selected === 2"><hr /></span>
          </p>
          <p @click="selected = 3">
            소울메이트<span v-if="selected === 3"><hr /></span>
          </p>
        </v-row>
        <hr class="nav-hr" />
        <TotalFriend
          v-if="selected === 0"
          class="my-16"
          :preFriendsList="this.preFriendsList"
          :friendsList="this.friendsList"
          :sowlmateList="this.sowlmateList"
        />
        <PreFriend
          v-if="selected === 1"
          class="my-16"
          :friendsList="this.preFriendsList"
          :selected="selected"
        />
        <MiddleFriend
          v-if="selected === 2"
          class="my-16"
          :friendsList="this.friendsList"
          :selected="selected"
        />
        <SowlMate
          v-if="selected === 3"
          class="my-16"
          :friendsList="this.sowlmateList"
          :selected="selected"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TotalFriend from '@/components/Friend/TotalFriend.vue';
import PreFriend from '@/components/Friend/PreFriend.vue';
import MiddleFriend from '@/components/Friend/MiddleFriend.vue';
import SowlMate from '@/components/Friend/SowlMate.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'friendsView',
  components: {
    TotalFriend,
    PreFriend,
    MiddleFriend,
    SowlMate,
  },
  data() {
    return {
      selected: 0,
    };
  },
  computed: {
    ...mapGetters(['preFriendsList', 'friendsList', 'sowlmateList']),
  },
  methods: {
    ...mapActions(['totalFriendList']),
  },
  mounted() {
    this.totalFriendList();
  },
};
</script>

<style scoped>
.friend-nav {
  position: relative;
  left: -0.8rem;
}
.friend-nav p {
  width: 6rem;
  margin-left: 0.5rem;
  text-align: center;
}
.friend-nav hr {
  position: relative;
  top: 0.5rem;
  background-color: #292d32;
  height: 3px;
  width: 6rem;
}

.nav-hr {
  position: relative;
  top: 1.2rem;
  left: -0.8rem;
}
</style>
