<template>
  <div id="phone">
      <nav-bar class="phone-nav"><div slot="center">手机归属地查询</div></nav-bar>
      <input type="number" placeholder="输入手机号号" v-model="mobile" />
      <p>您输入的号码：{{mobile}}</p>
      <button @click="sub">点击查询归属地</button>
      <h2>查询信息</h2>
      <table>
        <tr v-for="(value,key) in showinfo">{{key}} - {{value}}</tr>
      </table>
  </div>
</template>

<script>
   import axios from 'axios';
   import NavBar from 'components/common/navbar/NavBar';
  export default {
    name:'Phone',
    components:{
      NavBar
    },
    data(){
      return{
        mobile:Number,
        appkey:'ba1856a14915bd7b',
        showinfo:{}
      }
    },
    methods:{
      sub(){
          axios.get('/api/shouji/query',{
            params:{
              appkey:this.appkey,
              shouji:this.mobile
            }
          }).then(res=>{
            this.showinfo = res.data.result
            console.log(this.showinfo)
          }).catch(err=>{
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
  body{
    background:#f00
  }
  .phone-nav{
      background-color: var(--color-tint);
  }
</style>
