<template>
	<div class="wrapper" ref="aaaa">
		<!--tabbar-->
		<nav-bar class="category-nav"><div slot="center">产品分类</div></nav-bar>

		<div class="content">
			<!--左侧分类-->
			<tab-menu :catelist="getCateDatelist" @selectItem="selectIndex"></tab-menu>

			<scroll class="tab-content" :data="[categoryData]">
				<!--二级分类-->
				<tab-content-category :subcate="showsubcategory"></tab-content-category>

				<!--选项卡-->
				<tab-control :titles="['综合', '新品', '热销']" @tabClick="itemClick" :tab-index='tabindex' />
				<!--详情-->
				<tab-content-detail :detaillist="showDetail"></tab-content-detail>
			</scroll>
		</div>
	</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import TabMenu from './childComps/TabMenu';
import TabContentCategory from './childComps/TabContentCategory';
import TabContentDetail from './childComps/TabContentDetail';

import TabControl from 'components/content/tabControl/TabControl';
import Scroll from 'components/common/scroll/Scroll';


import { getCategories, getSubCategories, getCategoriesDetail } from 'network/category';

import {POP, SELL, NEW} from "@/common/const";
 import {tabControlMixin} from "@/common/mixins";
 
export default {
	name: 'Category',
	components: {
		NavBar,
		TabMenu,
		TabContentCategory,
		TabControl,
		TabContentDetail,
		Scroll //导入插件
	},
	 mixins: [tabControlMixin],
	data() {
		return {
			getCateDatelist: [],
			scroll: null,
			categoryData: {}, //新建的商品分类对象
			currentIndex: -1, 
			tabindex:0
		};
	},
	computed: {
		showsubcategory() {
			//如果当前左侧的索引是-1那么默认为空对象不显示数据，否则显示对应的分类对象里的对应索引的数据
			if (this.currentIndex === -1) return {};
			return this.categoryData[this.currentIndex].subcategories;
		},
		showDetail() {
			if (this.currentIndex === -1) return [];
			return this.categoryData[this.currentIndex].subcateDetail[this.currentType];
		}
	},
	created() {
		//请求分类数据
		this._getCategories();
	},
	// 组件创建完后调用
	mounted() {
		console.log('a');
	},
	methods: {
		_getCategories() {
			getCategories().then(res => {
				console.log(res);
				//获取分类数据
				this.getCateDatelist = res.data.category.list;

				//初始化每个类别子数据,新建一个分类对象，里面包含子分类和分类详情数据
				console.log(this.getCateDatelist.length);
				for (let i = 0; i < this.getCateDatelist.length; i++) {
					this.categoryData[i] = {
						subcategories: {},
						subcateDetail: {
							pop: [], //流行
							new: [], //新品
							sell: [] //热销
						}
					};
				}
				//默认请求第一个子分类的数据
				this._getSubCategories(0);
			});
		},
		selectIndex(index) {
			console.log(index);
			this._getSubCategories(index);
		},
		_getSubCategories(index) {
			this.currentIndex = index;
			//找到分类的对应索引的maitKey
			const mailKey = this.getCateDatelist[index].maitKey;
			getSubCategories(mailKey).then(res => {
				console.log(res);
				//子分类数据绑定
				this.categoryData[index].subcategories = res.data;
				this.categoryData = { ...this.categoryData };
				this._getDetail(POP);
				this._getDetail(NEW);
				this._getDetail(SELL);
				console.log('tabControl被激活');
				//tabcontrol清楚之前的选中状态,默认是第一个综合
				this.currentType= POP
				this.tabindex=0
			});
		},
		_getDetail(type) {
			//获取当前点击的miniWallerKey
			const minikey = this.getCateDatelist[this.currentIndex].miniWallkey;
			console.log(minikey);
			//获取详情
			getCategoriesDetail(minikey,type).then(res => {
				console.log(res)
				//保存获取的数据
				this.categoryData[this.currentIndex].subcateDetail[type] = res
				this.categoryData = {...this.categoryData}
			});
		}
	}
};
</script>

<style scoped>
/* Unable to preventDefault inside passive event listener due to target being treated as passive 解决重复点击菜单的时候弹出以上错误 */
/*
遗留问题：
当点击选项卡切换的时候，右侧没有回到顶部
点击不同大选项卡里的小选卡，当前索引状态不能回到初始的第一个选中状态
*/
* {
	touch-action: pan-y;
}
.wrapper {
	height: 100vh;
	overflow: hidden;
	/*overflow-y: scroll;*/
}
.content {
	background-color: #fff;
	position: absolute;
	left: 0;
	right: 0;
	top: 44px;
	bottom: 49px;
	display: flex;
}
.category-nav {
	background-color: #02ace4;
	color: #fff;
}
.tab-content {
	flex: 1;
	height: 100%;
}
</style>
