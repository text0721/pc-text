<template>
  <div class="swiper-container" id="mySwiper" ref="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in carouselList"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";

Swiper.use([Navigation, Pagination, Autoplay]);

export default {
  name: "Carousel",
  props: {
    carouselList: {
      type: Array,
      required: true,
    },
  },
  watch: {
    carouselList() {
      // 确保：swiper不能new多次
      if (this.swiper) return;
      this.$nextTick(() => {
        this.comSwiper();
      });
    },
  },
  methods: {
    comSwiper() {
      //new Swiper参数1可以是类选择器(可能会跟其他选择器冲突)，
      // 也可以是一个DOM元素（ref保证了每个swiper都是自己实例上的，不会出现轮播空白问题）
      this.swiper = new Swiper(this.$refs.swiper, {
        // direction: "vertical", // 垂直切换选项
        loop: true, // 循环模式选项

        autoplay: {
          delay: 2000, //设置自动轮播的间隔时间
          disableOnInteraction: false, //当用户点击下一页时，仍会开启自动轮播
        },

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //小圆点跳转
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // 如果需要滚动条
        // scrollbar: {
        //   el: ".swiper-scrollbar",
        // },
      });
    },
  },
  mounted() {
    // 轮播图数据要有 且 轮播图DOM元素要渲染完成 才能 new Swiper
    /* 
      1. ListContainer组件
        一上来没有数据 -- 触发watch
      2. Floor 
        一上来就有数据 -- mounted  
    */
    if (!this.carouselList.length) return;

    this.comSwiper();
  },
};
</script>

<style scoped>
</style>
