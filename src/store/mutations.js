import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  //mutation唯一的目的，修改state中的状态
  //但是mutation方法规则是比较单一的，一个方法只做一件事情,所以addCart方法应放到actions中
  //数量增加事件：ADD_COUNTER（使用commit就能调用此事件）
  [ADD_COUNTER](state, payload) {
    payload.count++; //产品数量增加
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;  //被选中状态
    state.cartList.push(payload);  //被选中时就将这个产品对象加入到购物车数组中
  },
  /**
   * 更新商品中Checked的值
   */
  updateChecked(state, payload) {
    //1、查找到当前要修改的商品
    let oldProduct = state.cartList.find(item => {
      return item.iid === payload.item.iid && item.productStyleMsg === payload.item.productStyleMsg && item.productSizeMsg === payload.item.productSizeMsg
    })
    //2、改变checked值
    oldProduct.checked = payload.checked;
  },

  /**
   * 更新商品中currentCounts的值
   */
  updateCounts(state, payload) {
    //1、查找到当前要修改的商品
    let oldProduct = state.cartList.find(item => {
      return item.iid === payload.item.iid && item.productStyleMsg === payload.item.productStyleMsg && item.productSizeMsg === payload.item.productSizeMsg
    })
    //2、改变checked值
    oldProduct.currentCounts += payload.number;
  },
  /**
   * 删除选中的商品
   */
  deleteProduct(state) {
    state.cartList = state.cartList.filter(item => !item.checked);
  }
}
