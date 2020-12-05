<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImg, index) in skuInfo.skuImageList"
        :key="skuImg.id"
      >
        <img :src="skuImg.imgUrl" @click="updateImgIndex(index)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Swiper, { Navigation } from "swiper";

Swiper.use([Navigation]);

export default {
  name: "ImageList",
  computed: {
    ...mapGetters(["skuInfo"]),
  },
  props: {
    updateImgIndex: Function,
  },
  watch: {
    skuInfo() {
      //监视异步请求的数据是否已经回来，开始是没数据，回来数据就触发
      //nextTick就会等页面渲染更新之后就触发，此时才可以new swiper
      this.$nextTick(() => {
        //  使用refs属性可以避免组件使用其他问题：this.$refs.swiper
        new Swiper(this.$refs.swiper, {
          slidesPerView: 5, // 每页显示轮播图的数量
          spaceBetween: 30, // 轮播图的间距
          slidesPerGroup: 5, // 每次换轮播图的数量
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>