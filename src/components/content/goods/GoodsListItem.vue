<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      //接口返回的是对象
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    itemClick() {
      this.$router.push('/detail/'+this.goodsItem.iid)
    },
    imageLoad() {
       this.$bus.$emit('itemImageLoad');  //事件总线传递事件
    }
  }
};
</script>

<style scoped>
.goods-item {
  width: 48%;
  position: relative;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
  display: block;
}
.goods-info {
  font-size: 12px;
  overflow: hidden;
  text-align: center;
  padding:5px
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
.goods-item  img[lazy='loading'] {
  width: 32px;
  height: 32px;
  position: absolute;
  top:50%;
  left:50%;
  margin-top:-16px;
  margin-left: -16px;
}
.goods-item img[lazy='loaded'] {
  animation: fadeLazyImg 0.5s;
  width: 100%;
}
@-ms-keyframes fadeLazyImg{
  0%{opacity: 0;}
  100${opacity: 1;}
}
</style>
