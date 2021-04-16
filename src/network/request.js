//安装axios：npm install axios  --save
//引入axios插件
import axios from 'axios'
//axios基于promise：request.then
export function request (config) {
  //axios.create（config）来创建axios实例对象
  const instance = axios.create({  //输出函数名为：request的函数（形参：网络请求config）
    baseURL: 'http://152.136.185.210:7878/api/m5',//请求数据的默认接口地址
    timeout: 5000  //请求数据的默认接口地址
  })

  //axios的拦截器（在这个案例并未使用拦截器对数据进行操作改变）
  //实例名.属性.请求.使用（函数）
  instance.interceptors.request.use(config => {
    return config
  },err => {  //请求失败时执行
    console.log(err)
  })
  //响应response拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err)
  })
  //发送真正的网络请求(拦截时将数据截取了，最后做完操作要将数据返回
  return instance (config)
}
