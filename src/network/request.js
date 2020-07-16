import axios from 'axios';

function request(config) {

  //创建实例
  const instance = axios.create({
    baseURL: "http://106.54.54.237:8000", //接口地址
    timeout: 5000, //请求超时时间5s
  })


  // 创建拦截器 可以在请求、响应在到达then/catch之前拦截

  //request拦截器
  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    console.log(err);
  })

  //响应reponse拦截器
  instance.interceptors.response.use(res => {
    return res.data; //获取响应的数据
  }, err => {
    console.log(err)
  })


  return instance(config);

}

// 急速数据api实例
 function request_jisu(config){

  //创建实例
  const instance = axios.create({
    baseURL: "/api", //接口地址
    timeout: 5000, //请求超时时间5s
    withCredentials: true, //是否时跨站点请求
  })

  //请求拦截器
  instance.interceptors.request.use(config=>{
      return config;
   }, err => {
      console.log(err);
   })


   //响应reponse拦截器
   instance.interceptors.response.use(res => {
     return res.data; //获取响应的数据
   }, err => {
     console.log(err)
   })

    return instance(config);
}
export {request,request_jisu}
