<template>
  <div class="NavBar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.NavBar {
  display: flex;
  height: 44px;
  text-align: center;
  line-height: 44px;
}
.left, .right {
  width: 60px;
}
.center {
  flex: 1;/*因为两个左右块都固定宽度，那么中间的这块给fix就是将剩余空间全部分配给了中间块，根据代码顺序就会形成正确的排布*/
}

</style>
