<!--导航栏-->
<template>
  <div>
    <NavBar>
      <div slot="left" class="backbtn" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
          <div
            v-for="(item,index) in titles"
            class="title-item"
            :class="{active:index===currentIndex}"
            @click="titleclick(index)"
            :key="item">{{item}}</div>
      </div>
    </NavBar>
  </div>

</template>

<script>
import NavBar from "@/components/commen/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components:{
    NavBar
  },
  methods:{
    titleclick(index){
      this.currentIndex=index
      this.$emit('tabclick',index)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
  font-size: 14px;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.backbtn img{
  margin-top: 12px;
}
</style>
