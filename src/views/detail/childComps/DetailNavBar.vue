<template>
  <div id="detailNavBar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick"><img src="~assets/img/common/back.svg" alt="" /></div>
      <div slot="center" class="title">
        <div v-for="(item, index) in title" @click="itemClick(index)" :key="index" class="title-item" :class="{ active: index === currentIndex }">{{ item }}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
export default {
  name: 'DetailNavBar',
  components:{
    NavBar
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      title: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    };
  },

  methods: {
    backClick() {
      this.$router.go(-1);
    },
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index);
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back img {
  margin-top: 10px;
}
.active {
  color: #00a1d6;
}
</style>
