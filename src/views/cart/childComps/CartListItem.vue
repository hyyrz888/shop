<template>
	<div class="shop-item">
		<div class="item-selector"><checkButton @click.native="checkedChange" :is-select="product.checked" /></div>
		<div class="item-img"><img :src="product.image" alt="商品图片" /></div>
		<div class="item-info">
			<div class="item-title">{{ product.title }}</div>
			<div class="item-desc">{{ product.desc }}</div>
			<div class="info-bottom">
				<div class="item-price left">{{ product.price }}</div>
				<div class="item-count right">x{{ product.count }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import checkButton from './checkButton';
export default {
	name: 'CartListItem',
	components: {
		checkButton
	},
	props: {
		product: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	methods: {
		checkedChange() {
			this.product.checked = !this.product.checked;
		}
	}
};
</script>

<style scoped>
.shop-item {
	width: 100%;
	display: flex;
	font-size: 0;
	padding: 5px;
	border-bottom: 1px solid #ccc;
}
.shop-item .item-selector {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 20px;
}
.item-img {
	margin-left: 5px;
}
.item-img img {
	height: 100px;
	border-radius: 5px;
	display: block;
}
.shop-item .item-info {
	font-size: 17px;
	color: #333;
	margin-left: 5px;
	position: relative;
	overflow: hidden;
}
.shop-item .item-info .item-title {
	font-size: 14px;
	color: #666;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-bottom: 10px;
}
.shop-item .item-info .item-desc {
	font-size: 13px;
	overflow: hidden;
	color: #999;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.info-bottom {
	position: absolute;
	left: 0;
	bottom: 0;
	font-size: 16px;
	width: 100%;
}
.info-bottom .item-price {
	color: #02ace4;
}
.info-bottom .item-count {
	color: #444;
}
</style>
