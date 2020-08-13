import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
Vue.use(Vuex)

const state = {
	cartList: []
}

const store = new Vuex.Store({
	state,
	//在mutations操作state，修改state状态，设计原则（每个方法完成的事情尽可能单一一点）
	mutations,
	 actions,
	 getters
	// modules
})

//3.挂载Vue实例上
export default store
