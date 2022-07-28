<template>
	<div>
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
		delete: [],
	}
},
components: {
},
computed: {
	...mapGetters(['InterestList', 'userInfo'])
},
methods: {
	...mapActions(['userInterestSave']),
	interestCheck(){
		console.log('InterestList',this.InterestList)
		for (const userinterest of this.userInfo.interests) {
			console.log(userinterest['title'])
			if (this.InterestList.includes(userinterest['title'])) {
				const index = this.InterestList.indexOf(userinterest['title'])
				console.log(index) 
			}
		}
	},
},
mounted() { this.interestCheck() }
}
</script>


<style scoped></style>
