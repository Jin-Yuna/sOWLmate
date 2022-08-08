<template>
  <div>
    <h3>RegionEditForm.vue</h3>
    <div>
      <label for="region">언어: </label>
      <select name="region" id="region" v-model="region">
        <option v-for="reg in regionList" :key="reg">{{ reg }}</option>
      </select>
    </div>
    <button @click="modifyUserInfo({ region: region })">저장</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RegionEditForm',
  data() {
    return {
      region: '',
    };
  },
  computed: {
    ...mapGetters(['userInfo', 'regionList']),
  },
  methods: {
    ...mapActions(['getUserInfo', 'modifyUserInfo', 'getRegionList']),
  },
  mounted() {
    this.getRegionList();
  },
};
</script>

<style></style>
