<template>
  <v-container>
    <v-row class="text-center">
      <v-col
        cols="12"
        data-aos="flip-left"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="800"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      >
        <v-img
          :src="require('@/assets/sowlImage/mainBigSmall.png')"
          class="my-3"
        />
      </v-col>
      <v-col class="mb-4">
        <h1
          class="display-2 font-weight-bold mb-3"
          data-aos="fade"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="800"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        >
          아직 공사가 끝나지 않았어요!
        </h1>
      </v-col>
      <v-col class="mb-5" cols="12">
        <v-row justify="center">
          <p>8조 화이팅~~</p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorldBeforeLogin',
};
</script>
<style scoped></style>
