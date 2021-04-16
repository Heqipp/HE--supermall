<template>
<!--  设置wrapper为固定区域，content为滚动区域高度-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
        <!--被滚动的元素将替换slot-->
      <slot></slot>
    </div>
  </div>
</template>

<script>
//引入第三方滚动插件betterscroll
import BScroll from 'better-scroll'

export default {
  name: "scroll",
  props: {
    probeType: {//实时监测位置
      type: Number,
      default: 0 //默认值为0
    },
    pullUpLoad: {//上拉加载更多
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,

    }
  },
  mounted() {
    //1.创建实例对象
    //为什么不使用document.querySelector而用$refs获取？因为queryselect只会获取第一个，获取到后后面的就不会获取了，所以如果存在相同的那么就会出现问题
    // 构件BScroll实例对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, //开启点击事件
      //传入的参数进行赋值
      probeType: this.probeType, //实施检测位置：从父组件传参过来：0/1/2/3
      pullUpLoad:this.pullUpLoad , //上拉加载的控制变量：布尔值
      bounce:true//开启滑动到最顶端/底端的回弹效果
    })
    //.on是注册事件，导出scroll事件到父组件
    //2.监听滚动的位置：position
    this.scroll.on('scroll', (position) => {
        // console.log(position)
        //向父组件传入事件scroll和位置position值
        this.$emit('scroll', position)
      }
    )
    //3.上拉加载更多
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')//向父组件传入事件
      console.log('触发上拉函数：输出函数pullingUp')
    })
  },

  methods: {
    //将页面滚动到特定位置XY，并且设定滚动过程时间time
    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time)
    },
    //结束上拉加载事件
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    //记录离开页面时滚动的Y值
    getScrollY() {
      //判断：scroll是否有值：有值就返回当前滚动值，无值的时候返回0
      return this.scroll ? this.scroll.y : 0
    },
    //刷新页面
    refresh() {
      //同时存在scroll和刷新函数
      this.scroll && this.scroll.refresh()
    },
  }
}
</script>

<style scoped>

</style>
