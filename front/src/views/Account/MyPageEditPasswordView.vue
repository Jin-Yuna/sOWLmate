<template>
  <div>
    <h2>MyPageEditPasswordView.vue</h2>
    <MyPageNavigation />
    <PasswordEditForm />
  </div>
</template>

<script>
import MyPageNavigation from '@/components/Account/MyPage/MyPageNavigation.vue'
import PasswordEditForm from '@/components/Account/MyPage/PasswordEditForm.vue'

export default {
  name: 'MyPageEditPasswordView',
  components: {
    MyPageNavigation,
    PasswordEditForm,
  },
}
</script>

<style></style>