//类似计算属性：使用数据进行计算
export default {
  cartLength(state) {
    return state.cartList.length;  //获取产品数量
  },
  cartList(state) {
    return state.cartList;  //获取所有产品数组
  }
}
