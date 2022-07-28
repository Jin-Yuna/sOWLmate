<template>
	<div>
		{{ InterestList }}
		{{ userInterest }}

		<v-chip-group v-model="userInterest" column multiple>
			<v-chip v-for="interest in InterestList" :key="interest">
				{{ interest }}
			</v-chip>
		</v-chip-group>
		<button @click="userInterestSave(userInterest)">저장</button>
	</div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
name: 'InterestEditForm',
data() {
	return {
			userInterest: [],
	}
},
components: {
},
computed: {
	...mapGetters(['InterestList'])
},
methods: {
	...mapActions(['userInterestSave'])
}
}
</script>


<style scoped></style>
