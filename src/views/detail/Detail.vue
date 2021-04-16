<template>
  <div id="Detail" class="wrapper">
    <!--    顶部分类导航栏-->
    <DetailNavBar class="detail-nav" @tabclick="navClick" ref="nav"></DetailNavBar>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">
      <DetailSwiper :top-images="topImages"></DetailSwiper>
      <!--    商品信息-->
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <!--    店铺信息-->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--      产品照片-->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <!--      产品介绍-->
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <!-- 评论-->
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <!--复用卡片组件-->
      <GoodsList :goods="recommendInfo" ref="recommend"></GoodsList>
    </Scroll>
    <!--    返回顶部按钮-->
    <back-top @click.native='backClick' v-show="isshow"></back-top>
    <!-- 底部导航栏-->
    <DetailBotBar @addCart="addCart"></DetailBotBar>
    <toast :message="message" :toastshow="toastshow"></toast>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childDetail/DetailNavBar";
import DetailSwiper from "@/views/detail/childDetail/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childDetail/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childDetail/DetailShopInfo";
import DetailParamInfo from "@/views/detail/childDetail/DetailParamInfo";
import DetailGoodsInfo from "@/views/detail/childDetail/DetailGoodsInfo";
import DetailCommentInfo from "@/views/detail/childDetail/DetailCommentInfo";
import DetailBotBar from "@/views/detail/childDetail/DetailBotBar";


import Scroll from "@/components/commen/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/backTop";
import Toast from "@/components/commen/toast/Toast";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '@/network/detail'
import {debouce} from "@/common/utils"; //防抖函数
import {mapActions} from 'vuex';


//防抖函数


export default {
  name: "Detail",
  components: {
    BackTop,
    DetailBotBar,
    DetailGoodsInfo,
    DetailBaseInfo,
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo,
    Scroll,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Toast

  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      paramInfo: {},
      detailInfo: {},
      commentInfo: [],
      recommendInfo: [],  //推荐信息
      getThemeTopY: null,//空对象
      themeTopYs: [],//各个分类距离顶部的Y值距离
      isshow: false, //开关：控制假分类栏和返回顶部按钮的显示开关：v-show控制
      message:'',
      toastshow: false //控制toast的显示

    }
  },
  created() {
    //1.保存当前路由rul里的iid ：根据iid的不同，拿取对应的数据
    this.iid = this.$route.params.iid //储存到data数据，便于后续使用
    //2.根据iid请求对应的全部数据
    getDetail(this.iid).then(res => {
      const data = res.result;  //将数据储存到变量data里
      //获取轮播图数据
      console.log(res);
      this.topImages = res.result.itemInfo.topImages
      //获取商品信息
      //通过创建Goods类的实例对象来获取数据并储存到goods、获取三个对象的全部数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //商品照片
      this.detailInfo = data.detailInfo
      //产品参数介绍
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list
      }
    })
    //请求推荐信息（请求数据的路径改变了，所以需要重新构造函数getRecommend
    getRecommend().then(res => {
      console.log(res)
      this.recommendInfo = res.data.list  //推荐信息储存
    })
    //防抖函数：计算各个分类距离顶部的Y值距离，并且传入数组themeTopYs
    this.getThemeTopY = debouce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0) //第一个距离为0
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)  //加入这个数值：无穷大的意思，为了营造区间
      console.log(this.themeTopYs)
    }, 100)
  },


  methods: {
    //可以使用对象方式 'add':'addCart'
    ...mapActions(['addCart']), //map辅助的调用vuex
    //返回顶部按钮
    backClick() {
      //console.log('1')
      //调用子组件的函数scrollTo
      //第一个scroll是获取子组件的ref名，然后第二个是给子组件命令滚动属性：scroll，让其滚动指定位置
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    //动态监听滚动Y值
    contentScroll(position) {
      //返回顶部按钮判断
      this.isshow = (-position.y) > 1000
      //console.log(position)

      //获取Y值：
      const positionY = -position.y
      //对比Y值：在区间Y值内对比，然后动态的切换分类的高亮效果
      let length = this.themeTopYs.length//简化写法
      for (let i = 0; i < length - 1; i++) {
        //对比区间：（为什么使用最大值：无穷？因为我们不知道详情页最大高度，因为他是动态获取数据的，每个模块高度内容不确定）
        //0<Y<’参数‘组件距顶部的高度   =>让‘商品’高亮
        //’参数‘组件距顶部的高度<Y<’评论‘组件距顶部的高度   =>让‘参数’高亮
        //’评论‘组件距顶部的高度<Y<’推荐‘组件距顶部的高度   =>让‘评论’高亮
        //’推荐‘组件距顶部的高度<Y<最大值：无穷   =>让‘推荐’高亮
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;  //遍历i进行比较，符合区间时就将此事的i值赋值给currentIndex，
          this.$refs.nav.currentIndex = this.currentIndex  //将值传入打导航栏组件
        }
      }
    },
    //父组件获取子组件NavBar导出的点击事件：执行页内跳转
    navClick(index) { //用index判断跳转的距离，与数组themeTopYs里的距离对应
      //console.log('--')
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200) //+44是因为有导航栏，微调跳转后的距离//200是跳转时间
    },
    //商品照片加载完毕后运行一次刷新页面高度
    imageLoad() {
      console.log("产品图片加载完毕");
      this.$refs.scroll.refresh();
      console.log("我已经将滚动高度进行刷新");
      this.getThemeTopY() //当产品照片加载完毕后执行函数：计算各个分类距离顶部的距离然后储存到数组
    },
    //点击‘添加到购物车’事件：
    addCart() {
      const product={}//创建对象：es6写法，创建键值对//创建对象product
      product.image = this.topImages[0]//将需要的信息赋值到对象的属性里
      product.title = this.goods.title;//产品的标题
      product.desc = this.goods.desc;//产品的描述
      product.price = this.goods.newPrice;//产品的最新价格
      product.iid = this.iid;
      product.realPrice = this.goods.realPrice;
      //console.log('获取购物车信息：')
      //console.log(product)
      //toast显示事件：
      this.$store.dispatch('addCart', product).then(res=>{
        console.log('点击购物车输出res')
        console.log(res) //此时的res是vuex里addCart方法最后执行的resolve函数，里的字符串‘当前的商品数量+1’作为res
        this.toastshow=true //控制toast的显示
        this.message=res  //显示信息
        setTimeout(()=>{ //定时器：显示一段时间就消失
          this.toastshow=false  //隐藏toast
          this.message=''  //清空message
        },1500)
      })
    }
  }
}
</script>

<style scoped>
/*详情页整体优先级上移，将导航栏盖住*/
#Detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff; /*背景白色*/
  height: 100vh;

}

.content {
  height: calc(100% - 88px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #f6f6f6;
}
</style>
