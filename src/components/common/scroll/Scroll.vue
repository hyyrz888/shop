<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<!-- 定义一个插槽 -->
			<slot></slot>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
	name: 'Scroll',
	props: {
		probeType: {
			//获取滚动的位置默认0  1 2 3个值 表示3中状态显示位置信息
			type: Number,
			default: 0
		},
		pullUpLoad: {
			//开启上拉刷新
			type: Boolean,
			default: false
		},
		data: {
			type: Array,
			default: () => {
				return [];
			}
		}
	},
	watch: {
		data() {
			setTimeout(this.refresh, 20);
		}
	},
	data() {
		return {
			_scroll: null
		};
	},
	mounted() {
		//加载scroll
		this._scroll = new BScroll(this.$refs.wrapper, {
			click: true,
			probeType: this.probeType, //获取滚动位置
			pullUpLoad: this.pullUpLoad //上拉刷新
		});

		//监听滚动位置
		this._scroll.on('scroll', position => this.$emit('scroll', position));

		//监听上拉刷新
		this._scroll.on('pullingUp', () => {
			this.$emit('pullingUp');
		});
	},
	methods: {
		refresh() {
			this._scroll && this._scroll.refresh();
		},
		finishPullUp() {
			this._scroll.finishPullUp();
		},
		scrollTo(x, y, time = 500) {
			this._scroll && this._scroll.scrollTo(x, y, time);
		},
		getPositionY() {
			return this._scroll ? this._scroll.y : 0;
		}
	}
};
</script>

<style></style>
