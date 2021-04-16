<!--卡片内容盒子div-->
<template>
  <div class="goods">
    <goods-list-item v-for="(item, id) in goods" :goods-item="item" :key="id"/>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  //从父组件获取传入过来的goods数据
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;/*子元素设置换行*/
  justify-content: space-evenly;/*主轴上元素平分剩余空间*/
  padding: 2px;
}

</style>
