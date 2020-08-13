<template>
	<div class="check-button" :class="{ active: isSelect }"><img src="~assets/img/cart/tick.svg" alt="" /></div>
</template>

<script>
export default {
	name: 'CheckButton',
	props: {
		isSelect: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		
	}
};
</script>

<style scoped>
.check-button {
	border-radius: 50%;
	border: 2px solid #aaa;
}
.active {
	background-color: #02ace4;
	border-color: #02ace4;
}
</style>
