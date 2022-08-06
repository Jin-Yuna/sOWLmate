<template>
  <div>
    <h3>LanguageEditForm.vue</h3>
    <div>
      <label for="lang">언어: </label>
      <select name="lang" id="lang" v-model="lang">
        <option v-for="lan in languageList" :key="lan">{{ lan }}</option>
      </select>
    </div>
    <button @click="modifyUserInfo({ language: lang })">저장</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PasswordEditForm',
  data() {
    return {
      lang: '',
    };
  },
  computed: {
    ...mapGetters(['userInfo', 'languageList']),
  },
  methods: {
    ...mapActions(['getUserInfo', 'modifyUserInfo', 'getLanguageList']),
  },
  mounted() {
    this.getLanguageList();
  },
};
</script>

<style></style>
