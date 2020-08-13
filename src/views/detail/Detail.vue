<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />

		<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
			<detail-swiper :top-images="topImages" />
			<detail-base-info :goods="goods" />
			<detail-shop-info :shop="shop" />
			<detail-goods-info :detail-info="detailInfo" ref="params" @imageLoad="detailImgLoad" />
			<detail-param-info :param-info="paramInfo" />
			<detail-comment-info :comment-info="commentInfo" ref="comment" />
		</scroll>
		<!--显示返回顶部-->
		<detail-bottom-bar @addCart="addToCart" />
		<back-top @click.native="backClick" v-if="isShowBackTop" />
	</div>
</template>
<!-- <goods-list :goods="recommends" ref="recommends" /> -->
<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar';

import GoodsList from 'components/content/goods/GoodsList';

import Scroll from 'components/common/scroll/Scroll';

import { getDetails, Goods, Shop, GoodsParam, getRecommend } from 'network/detail';
import { debounce } from 'common/utils';
import { itemListenerMixin, backTopMixin } from 'common/mixins';

import { mapActions } from 'vuex';
export default {
	name: 'Detail',
	components: {
		DetailNavBar,
		DetailSwiper,
		DetailBaseInfo,
		DetailShopInfo,
		DetailGoodsInfo,
		DetailParamInfo,
		DetailCommentInfo,
		DetailBottomBar,
		GoodsList,
		Scroll
	},
	mixins: [itemListenerMixin, backTopMixin],
	data() {
		return {
			iid: null,
			topImages: [],
			goods: {},
			shop: {},
			detailInfo: {},
			paramInfo: {},
			commentInfo: {},
			recommends: [],
			themeTopYs: [],
			isShowBackTop: false
		};
	},
	created() {
		//1.保存传入的iid
		this.iid = this.$route.params.iid;
		this.getDetail(this.iid);
		//获取数据
		getDetails(this.iid).then(res => {
			//1.获取顶部轮播数据
			const data = res.result;
			this.topImages = data.itemInfo.topImages;

			//2.获取商品信息
			this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

			//3.创建店铺信息的对象
			this.shop = new Shop(data.shopInfo);

			//4.保存商品的详情数据
			this.detailInfo = data.detailInfo;

			//5.获取产品参数信息
			this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

			//6.取出评论的信息
			if (data.rate.cRate !== 0) {
				//评论不为0
				this.commentInfo = data.rate.list[0];
			} else {
				console.log('没有评论!');
			}
		});
		//3.请求推荐数据
		getRecommend().then(res => {
			this.recommends = res.data.list;
		});
	},

	mounted() {},
	destroyed() {
		console.log('组件销毁');
		this.$bus.$off('itemImgLoad', this.itemImgListener);
	},
	methods: {
		...mapActions(['addCart']),
		getDetail(iid) {
			getDetails(iid).then(res => {
				// console.log(res);
			});
		},
		contentScroll(position) {
			//滑动页面让导航自动跟踪到对面的导航锚点
			const positionY = -position.y;

			let length = this.themeTopYs.length; //4
			for (let i = 0; i < length; i++) {
				if (
					this.currentIndex !== i &&
					((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))
				) {
					this.currentIndex = i;
					console.log(this.currentIndex);
					this.$refs.nav.currentIndex = this.currentIndex;
				}
			}

			//是否显示回到顶部
			this.isShowBackTop = -position.y > 1000;
		},
		detailImgLoad() {
			//图片内容全部加载完成执行一次刷新
			// this.itemListenerMixin.refresh();
			//this.$refs.scroll.refresh();
			this.refresh();
			this.themeTopYs = [];
			this.themeTopYs.push(0);
			this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44); //参数的起始位置
			this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
			//this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 44);
		},
		titleClick(index) {
			//点击对应的导航锚点页面滑动到指定的位置
			this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
		},
		addToCart() {
			//获取需要展示到购物车的信息
			const product = {};
			product.image = this.topImages[0];
			product.title = this.goods.title;
			product.desc = this.goods.desc;
			product.price = this.goods.realPrice;
			product.iid = this.iid;
			//console.log('-----');
			//将商品添加到购物车
			// this.$store.cartList.push(product);
			//用mutations
			//this.$store.commit('addCart', product);
			//用actions操作
			// this.$store.dispatch('addCart', product).then(res => {
			// 	console.log(res);
			// });
			//mapactions映射后的写法
			this.addCart(product).then(res=>{
				this.$toast.show(res)
				//console.log(this.$toast)
			})
			//this.$refs.scroll.refresh();
		}
	}
};
</script>

<style scoped>
#detail {
	position: relative;
	z-index: 9;
	background-color: #f5f5f5;
	height: 100vh;
}

.detail-nav {
	position: relative;
	z-index: 9;
	background-color: #fff;
}

.content {
	height: calc(100% - 44px - 49px);
	overflow: hidden;
}
li {
	list-style: none;
}
</style>
