import Vue from 'vue'
import Vuex from 'vuex'
import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
//1.安装插件
Vue.use(Vuex)
const state={
  cartList: [] //将购物车的产品对象放入此数组
}
//2.创建store对象
const store = new Vuex.Store({
  state,
  mutations,//数据修改
  actions,//改变数据
  getters,//对数据的二次处理
})

//3.挂载
export default store
