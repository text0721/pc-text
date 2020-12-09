// @ts-nocheck
import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

// 引入公共重置样式
import "./style/reset.css";
//引入font字体图标样式
import "./style/iconfont.css";
//引入ElementUi组件库
import "./plugins/element.js";

//因为该组件多次使用，引入swiper样式
import "swiper/swiper-bundle.min.css";

//引入图片懒加载
import "./plugins/lazyload.js";

// 引入mockServer，为了加载里面代码
// 里面代码一旦加载，就去启动mock服务器，从而拦截相应的请求
import "./mock/mockServer";

Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    // 初始化全局事件总线对象
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
