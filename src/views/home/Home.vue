<template>
  <div id="home" class="wrapper">
    <!--首页导航-->
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <!--真分类栏,满足距离条件时显示这个控制栏-->
    <TabControl
      :title="['流行','新款','精选']"
      @tabclick="tabclick"
      ref="TabControl"
      class="tabcontrol2"
      v-show="tabshow"
    ></TabControl>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadmore"

    >
      <!-- 调用轮播图组件-->
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!--调用轮播下图组件-->
      <RecommendView :recommends="recommends"/>
      <!--调用潮流图片组件-->
      <FeatureView/>
      <!--调用分类栏组件-->
      <TabControl
        :title="['流行','新款','精选']"
        class="TabControl"
        @tabclick="tabclick"
        ref="TabControl"
      ></TabControl>
      <!--调用分类卡片组件-->
      <!--通过currentType这个变量来控制显示哪个卡片的页面内容-->
      <GoodsList :goods="goods[currentType].list"></GoodsList>
    </scroll>
    <!--返回顶部按钮-->
    <back-top @click.native='backClick' v-show="isshow"></back-top>
  </div>
</template>

<script>

//导入本页面组件系列：
//导入轮播图下面的圆图
import RecommendView from "@/views/home/childComps/RecommendView";
//导入轮播图
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
//导入潮流图片组件
import FeatureView from "@/views/home/childComps/FeatureView";
//导入三分类组件
import GoodsList from "@/components/content/goods/GoodsList";
//导入公用组件系列：
import Scroll from '@/components/commen/scroll/Scroll'
import NavBar from "@/components/commen/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import BackTop from "@/components/content/backTop/backTop";

//导入数据组件系列：
import {getHomeMultidata, getHomeGoods} from "@/network/home";


export default {
  name: "Home",
  data() {
    return {
      is:true,
      result: null,
      banners: [],//轮播图数据数组：里面将每个轮播图的抽象为对象保存，对象里面包含这个图片的各种信息：link、image、title等
      recommends: [],
      currentType: 'pop',//默认当前类型为pop类型
      isshow: false, //开关：控制假分类栏和返回顶部按钮的显示开关：v-show控制
      tabshow:false,
      tabOffsetTop: 0, //距离视口顶部的距离

      //三分类淘宝卡片的数据储存：对象形式储存三个属性，属性值用对象形式，属性值里面储存获取到的两个参数：页数和内容
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      }
    }
  },
  //直接运行函数
  //切换页面=切换路由，会造成页面的销毁，所以要避免路由销毁
    destroyed() {  //路由销毁时执行此函数，输出一个log
      console.log('销毁');
    },

  //页面失去活跃时，储存Y值到变量this.saveY
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY() //获取组件scroll的函数
     // console.log(this.saveY)  检测Y值是否被储存
    },
  //页面处于活跃时，进行Y值跳转
  activated() {
    this.$refs.scroll.refresh()  //刷新页面高度在进行计算Y值
    this.$refs.scroll.scrollTo(0, this.saveY, 0)

  },

  components: {
    BackTop,
    Scroll,
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
  },
  //生命周期函数created（）{}//这里面只写调用函数，不写内容，内容和结构分离写法，拒绝繁杂
  created() {
    //请求多个数据
    this.getHomeMultidata()
    //请求三分类数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    //当轮播图加载完毕后，开始计算分类栏组件里视口顶部的距离
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.TabControl.$el.offsetTop//获取组件、获取属性
    },
    //上拉加载更多图片
    loadmore() {
      // console.log('shangla')
      this.getHomeGoods(this.currentType)//传入的是当前分类  pop/new/sell
      this.$refs.scroll.refresh()
      console.log('我已经刷新一次')
    },
    //返回按钮的显示/隐藏的条件判断事件
    //从子组件获取的实时监听滚动位置事件scroll=contentScroll事件
    //相当于：页面开始滚动时就运行contentScroll函数进行判断
    contentScroll(position) {
      //console.log(position)实时数据距离：方便观察
      //isshow控制返回顶部按钮的显示
      this.isshow = (-position.y) > 1000
      //tabshow控制分类栏的显示：tabOffsetTop是分类栏距离顶部的距离，滚动距离Y值>taboffsetTop时代表滚动位置已经到达吸顶位置
      this.tabshow = (-position.y) > this.tabOffsetTop
    },
    //监听tabControl点击事件：点击分类，改变内容
    tabclick(index) {
      //console.log(index)测试数值是否传入
      //switch判断：通过index的值来判断执行什么操作
      switch (index) {
        case 0://index=0说明是第一个分类：流行
          this.currentType = 'pop'  //展示对应内容：goods[currentType].list=goods['pop'].list
          break  //调出此函数执行式
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    //返回顶部按钮
    backClick() {
      //console.log('1')检测是否监听到此函数
      //调用子组件的函数scrollTo（设置滚动位置）
      //第一个scroll是获取子组件的ref名，第二个是子组件导出的滚动事件名：scroll，最后scrollTo是设置位置的事件函数
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res)//将获取的数据打印出来，验证是否正确去除数据
        this.result = res//将数据整体赋值给result
        this.banners = res.data.banner.list;//四个轮播图对象{}，储存到banners数组中
        this.recommends = res.data.recommend.list;
      })
    },
    //获取三分类卡片的数据
    getHomeGoods(type) {//传入类别type：sell/pop/new这三个分类
      const page = this.goods[type].page + 1  //page初始为0，先+1赋值给
      getHomeGoods(type, page).then(res => {  //再次调用网络请求函数，请求函数运算完毕后进行运算then函数(promise用法）
        this.goods[type].list.push(...res.data.list)//剩余参数，将获取的list数组传入储存数据的list空数组中
        this.goods[type].page += 1
        //获取子组件计算属性函数：停止上拉加载事件
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px; /*由于首页栏的position脱标了，不再占有实际空间，所以内容会被首页栏覆盖一部分*/
  height: 100vh; /*相当于视口宽度的100%*/
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;
}

.content {
  overflow: hidden;
  position: absolute; /*使用绝对定位设置高度*/
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tabcontrol2 {
  position: relative; /*未脱标*/
  z-index: 9; /*权重*/
}
</style>
