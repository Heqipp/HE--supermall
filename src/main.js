import Vue from 'vue'
import App from './App.vue'
import router  from "./router";
import store from './store'


Vue.config.productionTip = false

new Vue({
  store,//挂载vuex//在此处挂载可以让全局都能使用store
  router,//挂载路由
  render: h => h(App),
}).$mount('#app')
