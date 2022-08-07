<template>
  <v-card class="mx-auto" max-width="300">
    <v-img
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
    </v-img>
    <v-card-title>{{ room.title }}</v-card-title>
    <v-card-subtitle class="pb-0">
      {{ room.language }} | {{ room.interest }}</v-card-subtitle
    >

    <v-card-actions>
      <v-btn color="orange" text> 입장하기 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
