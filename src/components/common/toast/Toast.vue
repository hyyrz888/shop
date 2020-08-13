<template>
	<div class="toast" v-show="isShow">{{ msg }}</div>
</template>

<script>
export default {
	name: 'Toast',
	// props:{
	// 	msg:{
	// 		type:String,
	// 		default:''
	// 	},
	// 	isShow:{
	// 		type:Boolean,
	// 		default:false
	// 	}
	// },
	data() {
		return {
			msg: '',
			isShow: false
		};
	},
	methods: {
		show(msg, duration = 2000) {
			this.isShow=true;
			this.msg = msg;
			setTimeout(() => {
				this.isShow=false;
				this.msg = '';
			}, duration);
		}
	}
};
</script>

<style scoped>
.toast {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	padding: 8px 10px;
	background-color: rgba(0, 0, 0, 0.75);
	color: #fff;
	z-index: 9;
}
</style>
