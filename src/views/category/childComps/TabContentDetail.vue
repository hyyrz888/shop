<template>
	<div class="tab-content-detail">
		<grid-view>
			<goods-list-item v-for="(item,index) in detaillist" :goods-item="item" :key="index" />
		</grid-view>
	</div>
</template>

<script>
import GridView from 'components/common/gridview/GridView';
import GoodsListItem from 'components/content/goods/GoodsListItem';
export default {
	name: 'TabContentDetail',
	components: {
		GridView,
		GoodsListItem
	},
	data() {
		return {};
	},
	props: {
		detaillist: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	methods:{
		
	}
};
</script>

<style scoped=""></style>
