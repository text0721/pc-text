<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHide" />
    <!-- 三种方法显示隐藏footer：设置meta、watch、直接判断路由 -->
    <!-- <Footer v-if="$route.path !== '/login' && $route.path !== '/register'" /> -->
    <!-- <Footer v-if="isHide" /> -->
  </div>
</template>

<script>
import Header from "@comps/Header";
import Footer from "@comps/Footer";

export default {
  name: "App",
  // data() {
  //   return {
  //     isHide: true,
  //   };
  // },
  components: {
    Header,
    Footer,
  },
  // watch: {
  //   //方法2：显示隐藏footer
  //   $route: {
  //     handler(newVale) {
  //       this.isHide =
  //       newVale.path !== '/login' && newVale.path !== '/register';
  //       console.log(this.isHide)
  //     },
  //     immediate: true, // 一上来就调用执行
  //   },
  // },
};
</script>

<style>
</style>
