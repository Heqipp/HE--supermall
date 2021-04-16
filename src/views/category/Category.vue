<template>
  <div id="category" class="wrapper">
    <!--    导航栏组件-->
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <!--      左侧分类栏组件-->
      <scroll ref="scrollone"
              id="tab-menu"
              :probe-type="3"
              @pullingUp="loadmoreone"
              :pull-up-load="true"
      >
        <tab-menu :categories="categories"
                  @selectItem="selectItem"></tab-menu>
      </scroll>

      <!--      滚动组件-->
      <scroll id="tab-content"
              :data="[categoryData]"
              ref="scroll"
              :probe-type="3"
              @pullingUp="loadmore"
              :pull-up-load="true"
      >
        <!-- 分类内容组件-->
        <tab-content-category :subcategories="showSubcategory"></tab-content-category>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/commen/navbar/NavBar";
import TabMenu from "@/views/category/childcategory/TabMenu";
import Scroll from "@/components/commen/scroll/Scroll";
import TabContentCategory from "@/views/category/childcategory/TabContentCategory";
//import TabContentDetail from "@/views/category/childcategory/TabContentDetail";
import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
import {POP, SELL, NEW} from "common/const";


export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    //TabContentDetail
  },
  data() {
    return {
      categories: [],//左侧分类栏标题数据
      categoryData: {},//所有数据
      currentIndex: -1,
      isTabFixed: false,
      tabOffsetTop: 0,
    }
  },
  created() {
    // 1.请求分类数据
    this.getCategory()
  },
  //跳转页面后保存浏览位置Y值
  deactivated() {
    //保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  computed: {
    //向子组件传入右侧商品信息：标题和图片
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    //每个类下的具体的商品种类
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    //1.请求数据
    getCategory() {
      getCategory().then(res => {
        // 1.储存左侧分类栏的数据：包含：标题title、标识号maitKey、miniWallkey小标识号
        this.categories = res.data.category.list
        //console.log(this.categories)
        // 2.初始化每个类别的子数据：为每个数据对象里面单独创建出来两个对象： subcategories和categoryDetail
        for (let i = 0; i < this.categories.length; i++) {
          //为每个分类总数据对象都创建两个空的子对象：用于储存接下来获取的数据：方便查看数据位置
          this.categoryData[i] = {
            //右侧内容数据
            subcategories: {},
            //为每个分类数据创建三个数组：pop、new、sell
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }

        // 3.请求第一个分类的数据
        this.getSubcategories(0)
      })
    },
    getSubcategories(index) {
      //控制样式切换
      this.currentIndex = index;
      console.log(index)
      //mailKey:左侧栏每个分类都对应一个唯一的标识数：通过这个特殊标识来获取这个分类里的所有右侧数据
      const mailKey = this.categories[index].maitKey;
      //console.log(mailKey)//每点击一个左侧分类，都会输出这个分类的类似iid的标识=582/596/595...
      //通过标识号mailKey获取对应的分类内容数据
      getSubcategory(mailKey).then(res => {
        //储存右侧目录的图片和标题信息进入subcategories
        this.categoryData[index].subcategories = res.data
        //console.log( this.categoryData[index].subcategories)
        //所有数据储存到categoryData
        this.categoryData = {...this.categoryData}
        //console.log(this.categoryData)
        //调用函数：获取三个类型的详情页的数据：价格、标题、轮播图、iid...
        this.getCategoryDetail(POP)//输出的是POP这个类型的产品数据:有很多产品对象{}
        this.getCategoryDetail(SELL)
        this.getCategoryDetail(NEW)
      })
    },
    //获取三个类型的数据：
    getCategoryDetail(type) {
      // 1.获取请求的小标识号miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      //console.log(miniWallkey)
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来:不同类别POP/NEW/SELL的详情页数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        //console.log(res)
        this.categoryData = {...this.categoryData}
      })
    },
    //点击左侧目录时会调用：获取右侧商品信息函数，并传入对应的index
    selectItem(index) {
      this.getSubcategories(index)
    },
    //上拉滑动刷新页面高度：让页面能正常滑动（当有图片加载完毕后开始滑动上拉）
    loadmore() {
      this.$refs.scroll.refresh()
      console.log('我已经刷新完毕页面高度content')
    },
    loadmoreone() {
      this.$refs.scrollone.refresh()
      console.log('我已经刷新完毕页面高度content')
    },
  }
}

</script>

<style scoped>
#category {
  height: 100vh;
  position: relative;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;

  overflow: hidden;
}

.tab-control {
  position: relative;
  z-index: 9;
}

#tab-content {
  height: 100%;
  flex: 1;
}

#tab-menu {
  height: 100%;

}
</style>
