<template>
	<div class="cartlist">
		<scroll class="content" ref="scroll">
			<cart-list-item v-for="(item,index) in listdata" :key="index" :product="item" />
		</scroll>
	</div>
</template>

<script>
	import Scroll from 'components/common/scroll/Scroll'
	import CartListItem from './CartListItem'
	export default{
		name:'CartList',
		components:{
			Scroll,
			CartListItem
		},
		data(){
			return {
			}
		},
		activated(){
			console.log('---')
			this.$refs.scroll.refresh()
		},
		props:{
			listdata:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style scoped>
	.cartlist{
		height:calc(100% - 49px - 44px - 40px);
	}
	.content{
		height:100%;
		overflow:hidden
	}
</style>
