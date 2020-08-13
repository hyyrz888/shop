<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <!-- 图片load加载完成后 -->
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners:{
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem,
    },
    methods: {
      imageLoad() {
        if (!this.isLoad) {
          this.$emit('swiperImageLoad');
          this.isLoad = true;
        }
      }
    },
    data() {
      return {
       isLoad: false,
      }
    },
  }
</script>

<style scoped>

</style>
