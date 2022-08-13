<template>
  <v-sheet class="mx-auto" max-width="900">
    <v-slide-group show-arrows>
      <v-slide-group-item
        v-for="friend in preFriendsList"
        :key="friend.toUserNickname"
      >
        <ProfileForm
          :name="friend.toUserNickname"
          :intimacyEval="friend.intimacyEval"
        />
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import ProfileForm from '@/components/Profile/ProfileForm.vue';

export default {
  components: {
    ProfileForm,
  },
  props: {
    preFriendsList: Array,
  },
};
</script>

<style></style>
