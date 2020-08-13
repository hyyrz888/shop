import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload' //图片懒加载
import toast from 'components/common/toast'
import FastClick from 'fastclick'
Vue.config.productionTip = false

//事件总线（组件与组件之前传递事件）
Vue.prototype.$bus = new Vue();

//安装toast
Vue.use(toast);

//移动端浏览器在派发点击事件的时候，通常会出现300ms左右的延迟,解决300ms延迟
FastClick.attach(document.body)

Vue.use(VueLazyload, {
	attempt: 1, // 尝试加载图片数量
	loading: require('@/assets/img/loadings.gif'),
	preload: 1.3,
	observer: true,
})


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
