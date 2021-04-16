<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           :class="{active: index===currentIndex}"
           v-for="(item, index) in categories"
           :key="index"
           @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/commen/scroll/Scroll";
export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    //分类的数组：遍历创建分类
    categories: Array
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    //点击事件：切换样式：高亮+高亮条+背景颜色
    itemClick(index) {
      this.currentIndex = index //控制样式切换的开关
      this.$emit('selectItem', index) //点击事件导出到父组件Category：进行点击分类后切换分类内容的事件
    }
  }
}
</script>

<style scoped>
#tab-menu {
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
}
.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.menu-list-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>
