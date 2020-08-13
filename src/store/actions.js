import {
	ADDCOUNTER,
	ADDTOCART
} from './mutations_type.js'
export default {
	//context.payload 
	addCart(context, payload) {
		//let oldProduct = null;
		// for (let item in state.cartList) {
		// 	//如果已经添加了该商品
		// 	if (item.iid === playload.iid) {
		// 		oldProduct = item;
		// 	}
		// }

		//2
		return new Promise((resolve, reject) => {
			let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
			if (oldProduct) {
				//oldProduct.count += 1
				context.commit(ADDCOUNTER, oldProduct);
				resolve('商品数量+1');
			} else {
				payload.count = 1;
				//context.state.cartList.push(payload)
				context.commit(ADDTOCART, payload)
				resolve('加入购物车成功');
			}
		})

	}
}
