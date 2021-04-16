import {request} from "@/network/request";

//获取对应iid的详情页全部数据
export function getDetail(iid)  //传参：iid
{
  return request({
    url: '/detail',  //此时路径对了，就已经获取到iid的全部数据了：并且将全部数据赋值为对象{}返回给request
    params: {  //get请求数据：根据参数iid对应才能取到数据，首先匹配传入的iid在后端数据是否有这个iid，
      iid
    }
  })
}
//卡片信息
export function getRecommend(){
  return request({
    url:'/recommend',
  })
}
//商品信息：获取杂乱数据整合到一个类中
export class Goods {
  constructor(itemInfo, columns, services) {  //获取三个数据根，这三个对象里的数据都被获取了
    this.title = itemInfo.title  //将需要的数据进行重命名，方便使用和辨认
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
//商品信息类
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
//产品参数介绍
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.image ? info.image[0]: '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

