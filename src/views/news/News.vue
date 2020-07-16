<template>
  <div id="news">
    <!-- <nav-bar class="home-nav"><div slot="center">新闻</div></nav-bar> -->
    <ul>
      <li v-for="(value, key) in channelList" @click="setActive(key),getNewsList(value)" :class="{ active: key === currentIndex }">{{ value }}</li>
    </ul>

    <div class="newslist">
      <div class="newsitem" v-for="item in newslist">
        <figure @click="gourl(item.url)">
          <div class="pic"><img :src="item.pic" :alt="item.title" /></div>
          <div class="info">
            <h4>
              {{ item.title }}
              <time>{{ item.time }}</time>
            </h4>
          </div>
        </figure>
      </div>
      <!-- 分页 -->
      <Page num="10" totalPage="10" @showData="list" v-show="pageshow" />
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import Page from 'components/common/page/Page';

//请求新闻数据
import { getChannel , getNewsList } from 'network/news';

export default {
  name: 'News',
  data() {
    return {
      appkey: 'ba1856a14915bd7b', // api接口密钥
      channelList: [], //新闻频道
      currentChanelType: '头条', //当前频道
      newslist: [], // 新闻列表
      currentIndex: 0,
      pageshow:false,
    };
  },
  components: {
    NavBar,
    Page
  },
  created() {
    //新闻频道
      this.getChannel();
    //默认加载第一项 头条频道
      this.getNewsList(this.currentChanelType);
  },
  mounted() {
    this.$on('showData', val => {
      console.log(val);
    });

  },
  methods: {
    setActive(index) {
      this.currentIndex = index;
    },
    getChannel(){
      getChannel().then(res=>{
          this.channelList = res.result.slice(0, 10); //取10条数据
      }).catch(err => {
            console.log(err);
          });
    },
    getNewsList(type,start,num) {
      console.log(type);// 输出当前点击的新闻栏目
      this.currentChanelType = type;
      getNewsList(type,start,num).then(res => {
        if (res!=undefined)this.pageshow = 1;
        if (res.msg != 'ok') {
          return false;
        } else {
          this.newslist = res.result.list;
        }
      });
    },
    list(res) {
      //子组件传递过来2个参数  一个是起始位置start 一个是num 一页显示几条
      console.log(res);
      this.getNewsList(this.currentChanelType, res[0], res[1]);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
#news > ul {
  display: flex;
  flex-wrap: wrap;
  background: #444;
}
#news > ul li {
  line-height: 36px;
  height: 36px;
  text-align: center;
  color: #fff;
  padding: 0 10px;
  width: 20%;
}
#news > ul li.active {
  background: #02ace4;
}
.newslist {
  padding-bottom: 120px;
}
.newslist .newsitem {
  margin: 10px 0;
}
.newslist figure {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.newslist figure .pic {
  flex: 1;
  margin-right: 10px;
}
.newslist figure .pic img {
  width: 100%;
  display: block;
}
.newslist figure .info {
  flex: 3;
  text-align: justify;
}
.newslist figure .info {
  display: flex;
  justify-content: space-around;
}
.newslist figure .info h4 {
  font-size: 14px;
  color: #777;
}
.newslist figure .info time {
  font-size: 12px;
}
</style>
