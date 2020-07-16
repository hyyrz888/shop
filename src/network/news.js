import {request_jisu} from './request.js'

//新闻频道
const appkey = 'ba1856a14915bd7b';
export function getChannel(appkey='ba1856a14915bd7b'){
  return request_jisu({
    url:'news/channel',
    params:{
      appkey   //api权限接口
    }
  })
}

//新闻列表
export function getNewsList(channel,start=0,num=10,appkey='ba1856a14915bd7b'){
  return request_jisu({
    url:"/news/get",
    params:{
      channel,  //新闻频道
      start,   //新闻条数起始位置
      num,      //一页显示条数
      appkey   //api权限接口
    }
  })
}
