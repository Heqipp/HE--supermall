<template>
  <div>
    <CartNavBar></CartNavBar>
    <CartList></CartList>
    <cart-bottom-bar></cart-bottom-bar>
  </div>

</template>

<script>
  import CartNavBar from "@/views/cart/childCart/CartNavBar";
  import CartList from "@/views/cart/childCart/CartList";
  import CartBottomBar from "@/views/cart/childCart/CartBottomBar";
  import {mapGetters} from 'vuex'; //引入map辅助获取vuex数据的方法
  export default {
    name: "Cart",
    components: {
      CartBottomBar,
      CartNavBar,
      CartList
    },
    computed:{
      ...mapGetters([ //获取vuex
        'cartLength',  //产品数量
        'cartList'  //产品集合数组
      ])
    }
  }
</script>

<style scoped>

</style>
