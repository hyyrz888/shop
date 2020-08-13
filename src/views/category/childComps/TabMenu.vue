<template>
	<scroll id="menu">
		<div class="tab-menu">
			<div class="menu-list-item" :class="currentIndex === index ? 'active' : ''" v-for="(item, index) in catelist" :key="index" @click="itemClick(index)">
				{{ item.title }}
			</div>
		</div>
	</scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';
export default {
	name: 'TabMenu',
	components: {
		Scroll
	},
	props: {
		catelist: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			currentIndex: 0
		};
	},
	methods: {
		itemClick(index) {
			this.currentIndex = index;
			//将index传递出去
			this.$emit('selectItem',index)
		}
	}
};
</script>

<style scoped="">
#menu {
	background-color: #f6f6f6;
	height: 100%;
	width: 100px;
	box-sizing: border-box;
}
.menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
.active {
	background: #fff;
	 font-weight: 700;
	 border-left:3px solid var(--color-tint)
}
</style>
