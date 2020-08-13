<template>
  <div id="cart">
	 <nav-bar class="nav-bar">
		 <div slot="center">购物车({{Cartlength}})</div>
	</nav-bar>
   
	<!--购物车列表-->
	<cart-list :listdata="cartData" />
	<!--汇总-->
	<cart-bottom-bar />
  </div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import CartList from './childComps/CartList'
	import CartBottomBar from './childComps/CartBottomBar'
	import {mapGetters} from 'vuex'
	
	export default{
		name:'Cart',
		components:{
			NavBar,
			CartList,
			CartBottomBar
		},
		data(){
			return{
				
			}
		},
		computed:{
			//...mapGetters(['cartLength','cartList'])
			...mapGetters({
				Cartlength:'cartLength',
				cartData:'cartList'
			})
		}
	}
</script>

<style scoped>
	#cart{
		height:100vh;
		background-color: #fff;
	}
	.nav-bar{
		background-color:#02ace4;
		color:#fff
	}
</style>
