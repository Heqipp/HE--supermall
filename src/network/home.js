//这个文件是来导出home页面专属数据

//导出时没有default时，就用花括号{ }
import {request} from './request'
//创建获取数据函数getHomeMultidata
export function getHomeMultidata() {
  //返回request函数执行的结果//函数是一个promise异步函数
  return request({
    url: '/home/multidata'   //请求后端数据的具体地址：baseUrl+url=http://152.136.185.210:7878/api/m5/home/multidata
  })
}
//三分类页面：淘宝卡片的数据
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{  //只获取这个数据地址里的两个参数：type和page（分类pop、new、sell和页数）
      type,
      page
    }
  })
}


