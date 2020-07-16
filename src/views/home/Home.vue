<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <!-- <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore"> -->
      <home-swiper :banners="banners"  /><!--@swiperImageLoad="swiperImageLoad"-->
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed" />
     <!-- <recommend-view :recommends="recommends" />
      <feature-view /> -->
     <!-- <tab-control :title="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" /> -->
    <!-- </scroll> -->
    <!-- <back-top @click.native="backClick" v-show="isShowBackTop" /> -->   <!--.native监听组件中的原生事件-->
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper';
//import RecommendView from './childComps/RecommendView';
//import FeatureView from './childComps/FeatureView';

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
//import GoodsList from 'components/content/goods/GoodsList';
//import Scroll from 'components/common/scroll/Scroll';

import { getHomeMultidata, getHomeGoods } from 'network/home';
//import { debounce } from 'common/utils';
//import { itemListenerMixin, backTopMixin } from 'common/mixin';

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    //RecommendView,
    //FeatureView,
    TabControl,
    //GoodsList,
    //Scroll
  },
  //mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false,  //返回顶部
      tabOffsetTop: 0,
      isTabFixed: true
    };
  },
  deactivated() {
    //该钩子在服务器端渲染期间不被调用
    //取消全局事件的监听
    //this.$bus.$off('itemImgLoad', this.itemImgListener);
  },
  computed: {
    // showGoods() {
    //   return this.goods[this.currentType].list;
    // }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    // this.getHomeGoods('pop');
    // this.getHomeGoods('new');
    // this.getHomeGoods('sell');
  },
  mounted() {},
  methods: {
    //事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //1.判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;

      //2.决定topcontrol是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);

      //this.$refs.scroll.scroll.refresh();
    },
    // swiperImageLoad() {
    //   this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    // },

    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*position: fixed;*/
  /*top: 0;*/
  /*right: 0;*/
  /*left: 0;*/
  /*z-index: 1;*/
}

.content {
  /*height: calc(100% - 93px);*/
  /*margin-top: 44px;*/
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
