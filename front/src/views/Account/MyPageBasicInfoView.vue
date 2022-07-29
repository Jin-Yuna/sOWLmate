<template>
  <div>
    <h1>MyPageBasicInfoView.vue</h1>
    <MyPageAvatar />
    <MyPageBasicInfoForm />
  </div>
</template>

<script>
import MyPageAvatar from '@/components/Account/MyPage/Basic/MyPageAvatar.vue'
import MyPageBasicInfoForm from '@/components/Account/MyPage/Basic/MyPageBasicInfoForm.vue'

export default {
  name: 'MyPageBasicInfoView',
  components : {
    MyPageAvatar,
    MyPageBasicInfoForm,
  }
}
</script>

<style></style>