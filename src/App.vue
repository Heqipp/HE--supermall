<!--顶层组件-->
<template>
  <div id="app">
<!--保持活跃状态：缓存页面，不被销毁，免得重新加载页面浪费时间-->
<!--    exclude：排除。排除detail是因为详情页有不同的子页面，如果所有都被缓存后就只会加载第一个详情页，展示其他的-->
    <keep-alive exclude="Detail">
<!--      路由内容展示位置：相当于将路由内容替换slot-->
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabBar/MainTabBar";//引入导航栏内容组件
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
/*引入css样式*/
@import "assets/css/base.css";
</style>
