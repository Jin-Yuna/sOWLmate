<template>
  <div>
    <h2>MyPageEditLanguageView.vue</h2>
    <MyPageNavigation />
    <LanguageEditForm />
  </div>
</template>

<script>
import MyPageNavigation from '@/components/Account/MyPage/MyPageNavigation.vue'
import LanguageEditForm from '@/components/Account/MyPage/LanguageEditForm.vue'

export default {
  name: 'MyPageEditLanguageView',
  components: {
    MyPageNavigation,
    LanguageEditForm,
  },
}
</script>

<style></style>