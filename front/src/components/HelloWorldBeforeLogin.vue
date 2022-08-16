<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1
          class="display-2 font-weight-bold mb-3"
          data-aos="fade"
          data-aos-offset="150"
          data-aos-delay="30"
          data-aos-duration="800"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        >
          아직 공사가 끝나지 않았어요!
        </h1>
      </v-col>
    </v-row>
    <v-row class="my-9 text-center" align="center">
      <v-col
        cols="5"
        data-aos="fade-right"
        data-aos-offset="150"
        data-aos-delay="50"
        data-aos-duration="1100"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      >
        <h3>나의 글로벌</h3>
        <h3>SOWLMATE를 찾는 시간</h3>
        <v-btn class="mt-3" color="primary" elevation="2" text x-large
          >시작하기</v-btn
        >
      </v-col>
      <v-col cols="7">
        <img
          :src="require('@/assets/sowlImage/mainBigSmall.png')"
          class="my-3"
          data-aos="flip-left"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1100"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        />
      </v-col>
    </v-row>
    <v-row class="my-16 bg-primary text-center" align="center">
      <v-col
        cols="12"
        data-aos="fade-down"
        data-aos-offset="150"
        data-aos-delay="50"
        data-aos-duration="800"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      >
        <p>처음이라도 괜찮아요!</p>
        <p>천천히 오래봐요 우리</p>
        <p>부담 없이 즐기는 화상 펜팔, 지금 시작해볼까요?</p>
      </v-col>
    </v-row>
    <!--관심사 지정 및 언어 선택 소개-->
    <v-row class="my-9 text-center" align="center">
      <v-col
        cols="5"
        data-aos="fade-right"
        data-aos-offset="150"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      >
        <h3>나의 글로벌</h3>
        <h3>SOWLMATE를 찾는 시간</h3>
        <v-btn class="mt-3" color="primary" elevation="2" text x-large
          >시작하기</v-btn
        >
      </v-col>
      <v-col cols="7">
        <img
          :src="require('@/assets/sowlImage/mainBigSmall.png')"
          class="my-3"
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        />
      </v-col>
    </v-row>
    <!--마스킹 소개-->
    <v-row class="my-9 text-center" align="center">
      <v-col cols="7">
        <img
          :src="require('@/assets/sowlImage/mainBigSmall.png')"
          class="my-3"
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        />
      </v-col>
      <v-col
        cols="5"
        data-aos="fade-left"
        data-aos-offset="150"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      >
        <h3>나의 글로벌</h3>
        <h3>SOWLMATE를 찾는 시간</h3>
        <v-btn class="mt-3" color="primary" elevation="2" text x-large
          >시작하기</v-btn
        >
      </v-col>
    </v-row>
    <!--번역 소개-->
    <v-row class="my-9 text-center" align="center">
      <v-col
        cols="5"
        data-aos="fade-right"
        data-aos-offset="150"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      >
        <h3>나의 글로벌</h3>
        <h3>SOWLMATE를 찾는 시간</h3>
        <v-btn class="mt-3" color="primary" elevation="2" text x-large
          >시작하기</v-btn
        >
      </v-col>
      <v-col cols="7">
        <img
          :src="require('@/assets/sowlImage/mainBigSmall.png')"
          class="my-3"
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        />
      </v-col>
    </v-row>
    <!--편지 소개-->
    <v-row class="my-9 text-center" align="center">
      <v-col cols="7">
        <img
          :src="require('@/assets/sowlImage/mainBigSmall.png')"
          class="my-3"
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        />
      </v-col>
      <v-col
        cols="5"
        data-aos="fade-left"
        data-aos-offset="150"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      >
        <h3>나의 글로벌</h3>
        <h3>SOWLMATE를 찾는 시간</h3>
        <v-btn class="mt-3" color="primary" elevation="2" text x-large
          >시작하기</v-btn
        >
      </v-col>
    </v-row>
    <!--인생네컷 소개-->
    <v-row class="my-9 text-center" align="center">
      <v-col
        cols="5"
        data-aos="fade-right"
        data-aos-offset="150"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
      >
        <h3>나의 글로벌</h3>
        <h3>SOWLMATE를 찾는 시간</h3>
        <v-btn class="mt-3" color="primary" elevation="2" text x-large
          >시작하기</v-btn
        >
      </v-col>
      <v-col cols="7">
        <img
          :src="require('@/assets/sowlImage/mainBigSmall.png')"
          class="my-3"
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
        />
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
