import Vue from "vue";
import VueRouter from "vue-router";
//懒加载引入组件
const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Cart = () => import('@/views/cart/Cart')
const Profile = () => import('@/views/profile/Profile')
const Detail = () => import('@/views/detail/Detail')
//1.安装插件
Vue.use(VueRouter)
//属性
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path:'/detail/:iid', //v-bind动态绑定iid，当点击事件传入iid时就能动态改变此时的url
    component:Detail
  }
]
//2.创建router实例
const router = new VueRouter({
  routes,
  mode: 'history'//history模式的显示路径，没有#
})
//3.导出
export default router
