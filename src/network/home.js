import {request} from './request';

export function getHomeMultidata(){
  return request({
    url:"/home/multidata"
    //url:'/recommend'
  })
}

export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
