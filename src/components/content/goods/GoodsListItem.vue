<template>
  <div class="goods-item" @click="itemclick">
    <img :src="showImage" alt/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: { //接受goodsList传过来的参数：goodsItem：这里面含有detail传过来的照片数据recommendInfo
      type: Object,
      default() {
        return []
      }
    }
  },
  computed: {
    //为图片的地址src动态绑定计算属性showImage，计算属性计算出后改变src
    showImage() {
      //或语句：不能颠倒顺序，先判断是否存在详情页图片，如果没有才判断是否存在主页的图片
      return (this.goodsItem.show && this.goodsItem.show.img) || this.goodsItem.image;
    }
  },
  methods: {
    itemclick() {
      this.$router.push('/detail/' + this.goodsItem.iid)//点击卡片后，将此事的路由改为对应iid的详情页url
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px; /*圆角*/
}

.goods-info { /*文字部分*/
  font-size: 12px;
  position: absolute; /*绝对定位*/
  bottom: 5px; /*间隔*/
  left: 0;
  right: 0;
  overflow: hidden; /*隐藏多余的内容*/
  text-align: center;
}

.goods-info p { /*物品的名字信息*/
  overflow: hidden;
  text-overflow: ellipsis; /*多余的内容以省略号显示*/
  white-space: nowrap; /*文本不自动换行显示，全部文字以一行显示*/
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text); /*高亮颜色*/
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}
</style>
