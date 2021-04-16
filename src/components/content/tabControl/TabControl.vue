<template>
  <div class="TabControl">
    <div v-for="(item,index) in title" :key="index" class="TabControl-item"
         :class="{active:index===currentIndex}" @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>

</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods:{
    itemClick(index) {
      this.currentIndex=index
      this.$emit('tabclick',index)  //子组件向父组件传递index值，然后用index判断此时的类别
      //console.log('输出了emit')
    }
  }
}
</script>

<style scoped>
.TabControl {
  display: flex;
  text-align: center;
  background-color: #ffffff;
  z-index: 9;
}

.TabControl-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}

.active {
  color: #ff8198;
}
.active span{
  border-bottom: 3px #ff8198 solid;
  padding-bottom: 3px;/*下划线和文字的距离控制*/
}
</style>
