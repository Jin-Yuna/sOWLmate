<template>
	<div>
		<div v-for="( interest, index ) in InterestList" :key="index">
			<input id="{{ interest }}" type="radio" value="{{ interest }}" v-model="pick[index]">
			<label for="{{ interest }}">{{ interest }}</label>
		</div>
		<button>저장</button>
	</div>
<div>
		<v-chip-group
			v-model="userInterest"
			column
			multiple
		>
			<v-chip
				filter
				outlined
				v-for="interest in InterestList"
				:key="interest"
			>
				{{ interest }}
			</v-chip>
		</v-chip-group>
</div>
</template>


<script>
import { mapGetters } from 'vuex'

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
}
</script>


<style scoped></style>
