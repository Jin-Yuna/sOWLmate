<template>
  <div class="wrapper">
    <div class="profile-card js-profile-card">
      <div class="profile-card__img">
        <ProfileAvatar />
      </div>
      <div class="profile-card__cnt js-profile-cnt">
        <div class="profile-card__name">{{ name }}</div>
        <ProgressBar :intimacyEval="intimacyEval" />
        <button class="profile-card__button button--blue js-message-btn">
          Message
        </button>
        <button class="profile-card__button button--orange">Follow</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileAvatar from '@/components/Profile/ProfileAvatar.vue';
import ProgressBar from '@/components/Profile/ProgressBar.vue';

export default {
  components: {
    ProfileAvatar,
    ProgressBar,
  },
  props: {
    name: String,
    intimacyEval: Number,
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/pages/profile.scss';
</style>
