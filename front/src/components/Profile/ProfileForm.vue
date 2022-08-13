<template>
  <div class="wrapper">
    <div class="profile-card js-profile-card" @click="show = !show">
      <div class="profile-card__img">
        <ProfileAvatar />
      </div>
      <div class="profile-card__cnt js-profile-cnt">
        <div class="profile-card__name">{{ name }}</div>
      </div>
      <v-expand-transition>
        <v-container>
          <div v-show="show">
            <ProgressBar :intimacyEval="intimacyEval" />
            <br />
            <button style="width: 100%">편지쓰기</button>
            <v-btn
              :loading="loading[3]"
              :disabled="loading[3]"
              style="width: 100%"
              color="info"
              @click="load(3)"
            >
              편지함
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
          </div>
        </v-container>
      </v-expand-transition>
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
  data: () => ({
    show: false,
    loading: [],
  }),
  methods: {
    load(i) {
      this.loading[i] = true;
      setTimeout(() => (this.loading[i] = false), 3000);
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/pages/profile.scss';

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.v-container {
  position: relative;
  top: -20px;
}
</style>
