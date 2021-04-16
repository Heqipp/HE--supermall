<template>
  <!-- 调用轮播图盒子div组件-->
  <!--通俗的讲:ref特性就是为元素或子组件赋予一个ID引用,通过this.$refs.refName来访问元素或子组件的实例-->
  <!--v-if：如果banners的数组为空，就不显示轮播图组件-->
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="index">
<!--banners数组里面是多个对象，有这个图片的link属性//给轮播图绑定引用超链接-->
      <a :href="item.link">
<!--@load加载函数，图片每加载一次就运行此函数-->
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
//复用轮播图组件
import {Swiper, SwiperItem} from '@/components/commen/swiper'

export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false
    }
  },
  props: { //接受父级用v-bind传过来的数据
    banners: {  //接受父级data数据里的banners数组
      type: Array,
      default() {  //当无参数时，输出的默认值为空数组
        return []
      }
    }
  },
//注册
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    //图片加载完毕后开始运行函数：将数据传出到父组件Home.vue(如果图片未加载完毕，滚动的content高度就会出现问题)
    imageLoad() {
      if (!this.isload) {//判断：如果图片不在加载状态=等价于加载完毕，那么就执行导出，反之不进行操作
        this.$emit('swiperImageLoad') //父组件Home里的轮播组件接受函数
        this.isLoad = true//不控制的话图片会发送四次，通过isload来控制发送开关，发送一次就关闭
      }

    }
  }
}
</script>

<style scoped>

</style>
