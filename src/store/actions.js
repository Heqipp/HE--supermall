import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types';

export default {
  //
  addCart(context, payload) {
    return new Promise((resolve) => {//当promise为resolve（成功）时，后一步执行.then函数
      //payload新加入的商品
      //1、查找数组中是否有该商品
      let product = context.state.cartList.find((item) => { //find：遍历寻找元素
        return item.iid === payload.iid; //寻找条件：两个iid相相等，则说明购物车已经有这个产品了
      });
      //2、判断product
      if(product) {
        // product.count += 1;将产品数量+1的操作在mutation里实现
        context.commit(ADD_COUNTER, product);//调用mutations里的事件ADD_COUNTER，并将product作为参数传入
        resolve('当前的商品数量+1');//检测到产品后，运行resolve函数，进一步执行父组件Detail的then函数，并且将字符串作为res实参
      }else {
        payload.count = 1; //没有该产品时，就让数量=1
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload);
        resolve('添加了新的商品');
      }
    })
  }
}
