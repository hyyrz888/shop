<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!--@swiperImageLoad="swiperImageLoad"-->
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!--.native监听组件中的原生事件-->
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll';

import { getHomeMultidata, getHomeGoods } from 'network/home';
import { debounce } from 'common/utils';
import { itemListenerMixin, backTopMixin } from 'common/mixins';

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList, //商品列表
    Scroll
  },
  mixins: [itemListenerMixin, backTopMixin],
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
      isShowBackTop: false, //返回顶部
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0
    };
  },
  activated(){
    //设置记录
    console.log("设置的记录值"+this.saveY);
    // this.$refs.scroll._scroll.scrollTo(0,this.saveY,0);
    //console.log(this.$refs.scroll);
    this.$refs.scroll.scrollTo(0,this.saveY,200);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //使无效的 记录位置
    this.saveY = this.$refs.scroll.getPositionY();
    //该钩子在服务器端渲染期间不被调用
    //取消全局事件的监听    跳转到另外一个页面的时候会执行此生命周期函数  keep-alive
    this.$bus.$off('itemImgLoad', this.itemImgListener);
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
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
      //显示位置信息

      //1.判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;

      //2.决定topcontrol是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      //刷新better-scroll
      this.$refs.scroll._scroll.refresh();
    },
    swiperImageLoad() {
      //获取了tabcontrol2的相对顶部的距离
      // console.log(this.$refs.tabControl2.$el)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //console.log(res);
        //banner数据
        this.banners = res.data.banner.list;
        //推荐数据
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 当下拉刷新数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
        //console.log(this.$refs.scroll)

        //调用子组件里的finishPullUp方法
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
