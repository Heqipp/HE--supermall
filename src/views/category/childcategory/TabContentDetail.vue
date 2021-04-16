<!--分类内容-->
<template>
<!--  分类内容盒子div组件-->
  <grid-view>
<!--    -->
    <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goods="item"></goods-list-item>
  </grid-view>
</template>

<script>
import GridView from "@/components/commen/gridview/GridView";
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
  name: "TabContentDetail",
  components: {
    GridView,
    GoodsListItem
  },
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
</style>
