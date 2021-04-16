<!--导航栏输入动态内容展示-->
<template>
  <TabBar>
    <TabBarItem path="/home">
      <img slot="item-icon" src="@/assets/img/tabbar/home/home.svg" alt="">
      <img slot="item-icon-active" src="@/assets/img/tabbar/home/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </TabBarItem>
    <TabBarItem path="/category">
      <img slot="item-icon" src="@/assets/img/tabbar/category/category.svg" alt="">
      <img slot="item-icon-active" src="@/assets/img/tabbar/category/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </TabBarItem>
    <TabBarItem path="/cart">
      <img slot="item-icon" src="@/assets/img/tabbar/cart/cart.png" alt="">
      <img slot="item-icon-active" src="@/assets/img/tabbar/cart/cart_active.png" alt="">
      <div slot="item-text">购物车</div>
    </TabBarItem>
    <TabBarItem path="/profile">
      <img slot="item-icon" src="@/assets/img/tabbar/profile/profile.png" alt="">
      <img slot="item-icon-active" src="@/assets/img/tabbar/profile/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </TabBarItem>
  </TabBar>
</template>

<script>
import TabBar from '@/components/commen/tabbar/TabBar.vue'
import TabBarItem from '@/components/commen/tabbar/TabBarItem.vue'

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
</style>
