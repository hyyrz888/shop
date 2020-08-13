import {
	request
} from './request.js'

//分类列表
export function getCategories() {
	return request({
		url: '/category',
	})
}

//二级分类列表
export function getSubCategories(maitKey){
	return request({
		url:'/subcategory',
		params:{
			maitKey
		}
		
	})
}


//分类详情
export function getCategoriesDetail(miniWallkey,type){
	return request({
		url:'/subcategory/detail',
		params:{
			miniWallkey,
			type
		}
	})
}