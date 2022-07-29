<template>
  <div>
    <h3>LanguageEditForm.vue</h3>
    <div>
			<label for="lang">언어: </label>
			<select name="lang" id="lang" v-model="lang">
				<option v-for="lan in languages" :key="lan">{{ lan }}</option>
			</select>
		</div>
    <button @click="modifyUserInfo({ 'languages': lang })">저장</button>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PasswordEditForm',
  data() {
    return {
      lang: '',
      languages: [
          'KOREAN',
          'KOREAN',
          'ENGLISH',
      ],
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    ...mapActions(['getUserInfo', 'modifyUserInfo']),
  },
  
}
</script>

<style></style>