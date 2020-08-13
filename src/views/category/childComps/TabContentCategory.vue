<template>
	<div class="tab-content-category">
		<grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcate.list">
			<div class="item" v-for="(item, index) in subcate.list" :key="index">
				<a :href="item.link">
					<img class="item-img" :src="item.image" alt="" />
					<div class="item-text">{{ item.title }}</div>
				</a>
			</div>
		</grid-view>
	</div>
</template>

<script>
import GridView from 'components/common/gridview/GridView';
export default {
	name: 'TabContentCategory',
	components: {
		GridView
	},
	data() {
		return {};
	},
	props: {
		subcate: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	methods: {}
};
</script>

<style scope>
.panel img {
	width: 100%;
}
.item {
	text-align: center;
	font-size: 12px;
}
.item-img {
	width: 80%;
}
.item-text {
	margin-top: 15px;
}
</style>
