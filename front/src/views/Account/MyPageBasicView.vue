<template>
  <div>
    <h1>MyPageBasicView.vue</h1>
    <MyPageNavigation/>
    <button @click="withdrawal">탈퇴</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import sowl from '@/api/sowl'
import MyPageNavigation from '@/components/Account/MyPage/MyPageNavigation.vue'

export default {
  name: 'MyPageBasicView',
  components : {
    MyPageNavigation,
  },
  methods : {
    ...mapActions(['logout']),
    withdrawal() {
      axios({
        url: `${sowl.users.users()}${this.currentUser}`,
        method: 'delete',
        // data: JSON.stringify(userData)
      })
      .then(response => {
        if (response.data === 'success') {
          alert('성공적으로 탈퇴하였습니다')
          this.logout()
        } else {
          alert('탈퇴에 실패')
        }
      })
      .catch(error => {
        console.error(error)
      })
    }
  },
  computed : {
    ...mapGetters(['currentUser'])
  }

}
</script>

<style></style>