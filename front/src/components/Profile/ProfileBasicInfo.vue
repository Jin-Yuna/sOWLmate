<template>
  <div class="align">
    <p-small class="p-small">{{ region }}/{{ language }}</p-small>
    <v-row class="my-1">
      <main-chip v-for="interest in interests" :key="interest">
        <span>{{ interest }}</span>
      </main-chip>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    region: String,
    language: String,
    interests: Array,
  },
};
</script>

<style scoped>
p-small {
  color: #adb5bd;
}
.align {
  text-align: center;
  justify-content: center;
}
</style>
