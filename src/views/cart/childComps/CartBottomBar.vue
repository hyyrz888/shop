<template>
	<div class="cart-bottom-bar">
		<div class="content">
			<checkButton class="checkbtn" @click.native="checkAll" :is-select="status" />
			<span>全选</span>
			<div class="total">合计：￥{{ totalPrice }}</div>
			<div class="confirmbtn" @click="calcClick">确认 ({{ getLength }})</div>
		</div>
	</div>
</template>

<script>
import checkButton from './checkButton';
export default {
	name: 'CartBottomBar',
	components: {
		checkButton
	},
	data() {
		return {};
	},
	mounted() {
		//console.log(this.$store)
		console.log(this.$store);
	},
	computed: {
		totalPrice() {
			return this.$store.state.cartList
				.filter(item => {
					return item.checked;
				})
				.reduce((preValue, item) => {
					return item.price * item.count + preValue;
				}, 0)
				.toFixed(2);
		},
		getLength() {
			return this.$store.getters.cartList.filter(item => {
				return item.checked;
			}).length;
		},
		status() {
			//获取全部商品的状态，有一个未选择则不全选
			console.log(this.$store.getters.cartList)
			if (this.$store.getters.cartList.length === 0) return false;
			//return !(this.$store.getters.cartList.filter(item => !item.checked).length);
			//return !this.$store.getters.cartList.find(item=>!item.checked)
			//3
			for (let item of this.$store.getters.cartList) {
				//console.log(item)
				if (!item.checked) {
					return false;
				}
			}
			return true
		}
	},
	methods: {
		checkAll() {
			//全选
			console.log('---');
				console.log(this.status)
			if (this.status) {
				this.$store.getters.cartList.forEach(item => item.checked = false);
			} else {
				this.$store.getters.cartList.forEach(item => item.checked = true);
			}
		},
		calcClick(){
			//判断如果都没有选中那么就提示
			if(this.$store.getters.cartList.every(item=>item.checked === false)){
				this.$toast.show('请选择购买的商品');
			}else{
				this.$toast.show('购买成功！');
			}
		}
	}
};
</script>

<style scoped>
.cart-bottom-bar {
	position: relative;
	display: flex;
	width: 100%;
	height: 40px;
	background-color: #f5f5f5;
}
.content {
	display: flex;
	align-items: center;
	height: 40px;
}
.checkbtn {
	width: 20px;
	height: 20px;
	margin: 0 5px;
}
.total {
	margin-left: 5px;
}
.confirmbtn {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	width: 90px;
	text-align: center;
	background-color: #02ace4;
	line-height: 40px;
	color: #fff;
}
</style>
