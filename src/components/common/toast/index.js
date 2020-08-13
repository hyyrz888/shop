import Toast from './Toast'

//创建对象
const obj = {}

obj.install = Vue => {
	//创建组件构造器
	const toastContrustor = Vue.extend(Toast);
	
	//使用new方式用组件构造器创建组件对象
	const toast = new toastContrustor();

	//将组建对象，手动挂载到某一元素上
	toast.$mount(document.createElement('div'));
	
	//toast.$el对应的就是div
	document.body.appendChild(toast.$el)

	Vue.prototype.$toast = toast
}

export default obj;
// 以上类似创建一个vue对象

// new Vue({
// 	el:'div'
// })

// new Vue({
//     router,
//     store,
// }).$mount('#app') 

// // 创建构造器
// var Profile = Vue.extend({
//   template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
//   data: function () {
//     return {
//       firstName: 'Walter',
//       lastName: 'White',
//       alias: 'Heisenberg'
//     }
//   }
// })
// // 创建 Profile 实例，并挂载到一个元素上。
// new Profile().$mount('#mount-point')