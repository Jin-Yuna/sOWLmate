<template>
  <div>
    <div class="main-img-container">
      <v-img :src="require('@/assets/sowlImage/etc/main_after_login.svg')" />
      <v-container>
        <v-row>
          <v-card elevation="2" class="main-sub-card">
            <p class="p-small text-gray400 mt-4 ml-2">안녕하세요!</p>
            <p class="ml-2 pw-sb">{{ userInfo.nickname }}<span>님</span></p>
            <router-link :to="{ name: 'MyPageBasicInfoView' }">
              <div class="sub-chip"><span>계정관리</span></div>
            </router-link>
            <v-row class="mt-2 ml-2">
              <v-icon icon="mdi-home-search-outline" class="p-small"></v-icon>
              <p class="p-small">
                {{ userInfo.region }}
              </p>
            </v-row>
            <v-row class="mt-2 ml-2">
              <v-icon icon="mdi-alphabet-latin" class="p-small"></v-icon>
              <p class="p-small">{{ userInfo.language }}</p>
            </v-row>
          </v-card>

          <v-container class="main-part">
            <div>
              <v-row class="mt-4">
                <h2>나의 관심사</h2>
                <router-link :to="{ name: 'MypageEditInterestView' }">
                  <div class="sub-chip"><span>수정</span></div>
                </router-link>
              </v-row>
              <v-chip-group v-if="userInfo.interests" column class="mt-4"
                ><div
                  v-for="interest in userInfo.interests"
                  :key="interest.title"
                  class="main-chip"
                >
                  <span>{{ interest.title }}</span>
                </div>
                <router-link
                  :to="{ name: 'MypageEditInterestView' }"
                  v-if="userInfo.interests.length <= 0"
                >
                  <div class="main-chip">
                    <span>관심사 등록하러 가기</span>
                  </div></router-link
                ></v-chip-group
              >
            </div>
            <div>
              <h2>Live On! 추천 친구</h2>
              <p>현재 sowlmate를 기다리고 있는,</p>
              <p>
                나와의 관심사와 선호 언어가 일치하는 친구의 방을 추천드립니다
              </p>
            </div>
            <div>
              <h2>Live On! 나의 친구</h2>
              <p>나의 친구가 sowlmate를 기다려요!</p>
              <p>내 친구를 한번 더 보고싶다면?</p>
            </div>
            <div>
              <h2>직접 맛보는 쫀득쫀득한 친구 매칭</h2>
              <p>랜덤으로 친구를 만나보거나, 방을 직접 만들어보세요</p>
              <p>처음은 누구나 어렵지만, SOWLMATE가 도와줄게요!</p>
            </div>
            <div>
              <h2>띵똥! 편지 왔어요</h2>
              <p>나에게 도착한 편지, 누구에게 왔을까 궁금하지 않으세요?</p>
            </div>
          </v-container>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'HelloWorld',
  computed: {
    ...mapGetters(['userInfo']),
  },
};
</script>
<style scoped>
.main-img-container {
  position: relative;
  top: -2rem;
}
.main-sub-card {
  position: fixed;
  width: 7rem;
  height: 10rem;
}
.main-part {
  position: relative;
  left: 10rem;
}
.main-chip {
  height: 2rem;
  width: 8rem;
  border-radius: 4rem;
}
</style>
