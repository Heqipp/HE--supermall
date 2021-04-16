<!--右侧分类内容模块盒子div-->
<template>
  <div>
<!--    调用右侧盒子div组件-->
<!--    传入布局格式参数-->
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
<!--      用下列内容替换slot插槽-->
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from "@/components/commen/gridview/GridView";
export default {
  name: "TabContentCategory",
  components: {
    GridView
  },
  props: {
    //右侧所有产品数据
    subcategories: {
      type: Object,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.panel img {
  width: 100%;
}
.item {
  text-align: center;
  font-size: 12px;
}
.item-img {
  width: 80%;
}
.item-text {
  margin-top: 15px;
}
</style>
