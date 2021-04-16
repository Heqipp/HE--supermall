<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的档案</div>
    </nav-bar>
    <user-info/>
    <account-info/>
    <normal-list-view :list-data="orderList"></normal-list-view>
    <normal-list-view :list-data="serviceList"></normal-list-view>
  </div>
</template>

<script>
import NavBar from "@/components/commen/navbar/NavBar";
import UserInfo from "@/views/profile/childprofile/UserInfo";
import AccountInfo from "@/views/profile/childprofile/AccountInfo";  //
import NormalListView from "@/views/profile/childprofile/NormalListView";
export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    AccountInfo,
    NormalListView
  },
  data() {
    return {
      //数据储存在数组中，以对象形式存入：分离了内容和结构
      orderList: [
        {icon: 'message.svg', info: '我的消息'},
        {icon: 'pointer.svg', info: '积分商城'},
        {icon: 'vip.svg', info: '会员卡'},
      ],
      serviceList: [
        {icon: 'cart.svg', info: '我的购物车'},
        {icon: 'shopping.svg', info: '下载购物APP'},
      ]
    }
  }
}
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
