<template>
<div id="cartNavBar">
  <nav-bar>
<!--使用的是vuex里的getters里的计算属性cartLength-->
   <p slot="center">购物车({{cartLength}})</p>
  </nav-bar>
</div>
</template>

<script>
import NavBar from "@/components/commen/navbar/NavBar";
export default {
  name: "CartNavBar",
  components:{
    NavBar
  },
  computed:{
    cartLength(){
      return this.$store.state.cartList.length //获取产品数量
    }
  }
}
</script>

<style scoped>
#cartNavBar{
  background-color: #ff8198;
  font-size: 20px;
  color: #f6f6f6;
}
</style>
