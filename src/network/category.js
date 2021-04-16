import {request} from './request'

//获取分类页面全部数据
export function getCategory() {
  return request({
    url: '/category'
  })
}
//根据左侧分类的编号获取右侧对应的全部内容：图片和文字
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}
//获取右侧每个类型产品的详情数据：价格、标题、轮播图片、
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
