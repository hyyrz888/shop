<template>
  <div class="page-bar">
    <ul>
      <li><a @click="setActive(1), goPage(1)">首页</a></li>
      <!--页码大一1的时候显示上一页-->
      <li v-if="currentpage > 1"><a @click="currentpage--, goPage(currentpage)">上一页</a></li>
      <!--页码等于1的时候上一页禁止点击-->
      <li v-if="currentpage == 1"><a>上一页</a></li>
      <li v-for="page in stylePages" :class="{ active: currentpage == page }">
        <a @click="goPage(page)">{{ page }}</a>
      </li>
      <!--页码小于总页数-->
      <li v-if="currentpage < totalPage"><a @click="currentpage++, goPage(currentpage)">下一页</a></li>
      <!--页码等于总页数的时候,不能点击-->
      <li v-if="currentpage == totalPage"><a>下一页</a></li>
      <!-- 末页 -->
      <li><a @click="setActive(totalPage), goPage(totalPage)">末页</a></li>
      <!--总共多少页-->
      <li>
        <span>总页数 :{{ totalPage }} 页</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Page',
  data(){
    return{
      currentpage: 1, //当前页码
      start: 0, //起始位置
    }
  },
  props: {
    num: String, // 每页新闻条数
    totalPage: String //总页数
  },
  computed: {
    stylePages() {
      //分页的调整,只显示5页
      var l = 1;
      var r = this.totalPage; //10
      var arr = [];
      //如果总页数大于5
      if (r >= 5) {
        if (this.currentpage > 3 && this.currentpage < r - 2) {
          l = this.currentpage - 2;
          r = this.currentpage + 2;
        } else {
          //如果当前页码小于3
          if (this.currentpage <= 3) {
            l = 1;
            r = 5;
          } else {
            //当前页码大于  8  9
            r = this.totalPage;
            l = this.totalPage - 4;
          }
        }
      }
      //循环5组页码
      while (l <= r) {
        arr.push(l);
        l++;
      }
      //返回页码
      return arr;
    }
  },
  methods: {
    setActive(param){
      this.isActive = param;
    },
    //页面跳转
    goPage(param) {
      //当前页码
      this.currentpage = param;
      console.log(this.currentpage);
      //获取数据
      //起始位置
      this.start = (this.currentpage - 1) * this.num;

      //数据显示(把gopage事件提交到父组件)
      this.$emit('showData',[this.start,this.num]);
    }
  }
};
</script>

<style>
/*分页*/
.page-bar {
  margin: 20px;
  font-size: 12px;
}
.page-bar li:first-child > a {
  margin-left: 0px;
}
.page-bar li {
  float: left;
  margin-right: 5px;
  border: 1px solid #ddd;
  cursor: pointer;
  margin-bottom: 10px;
  list-style: none;
}
.page-bar a {
  text-decoration: none;
  position: relative;
  margin-left: -1px;
  padding: 6px 8px;
  display: block;
}
.page-bar a.disable {
  cursor: not-allowed;
}
.page-bar .active {
  color: #fff;
  cursor: default;
  background-color: #e96463;
  border-color: #e96463;
}
.page-bar .active a {
  color: #fff;
}
.page-bar span {
  padding: 6px 8px;
  display: block;
}
.page-bar i {
  font-style: normal;
  color: #d44950;
  margin: 0px 4px;
  font-size: 12px;
}
</style>
