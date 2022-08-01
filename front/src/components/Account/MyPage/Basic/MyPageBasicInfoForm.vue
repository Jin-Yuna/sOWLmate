<template>
  <div>
    <p>MyPageBasicinfoForm</p>
    <NicknameEditForm />
    <RegionEditForm />
  </div>
</template>

<script>
import NicknameEditForm from '@/components/Account/MyPage/Basic/NicknameEditForm.vue';
import RegionEditForm from '@/components/Account/MyPage/Basic/RegionEditForm.vue';

export default {
  components: {
    NicknameEditForm,
    RegionEditForm,
  },
};
</script>

<style></style>
