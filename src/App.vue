<template>
  <div id="app" class="wrapper">
    <keep-alive exclude="Detail">  <!--内页不被缓存-->
      <router-view/>
    </keep-alive>
<!-- 使用组件 -->
    <main-tab-bar/>
  </div>
</template>

<script>
//引入组件
import MainTabBar from "components/content/mainTabbar/MainTabBar"

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
  body{
    background:#f5f5f5
  }
</style>
