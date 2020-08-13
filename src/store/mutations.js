import {ADDCOUNTER,ADDTOCART} from './mutations_type.js'
export default {
	[ADDCOUNTER](state, payload) {
		payload.count += 1
	},
	[ADDTOCART](state, payload) {
		//商品默认选择状态
		payload.checked= true;
		state.cartList.push(payload)
	}
}
