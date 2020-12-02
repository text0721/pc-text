// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@views/Home";
import Login from "@views/Login";
import Register from "@views/Register";
import Search from "@views/Search";
import Detail from "@views/Detail";

// 重写push和replace方法,为了让编程式导航重复点击时不报错
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort);
  }
  // 如果用户不处理失败，给默认值：空函数
  return push.call(this, location, onComplete, () => {});
};

VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  // 处理失败
  if (onComplete && onAbort) {
    return replace.call(this, location, onComplete, onAbort);
  }
  // 不处理失败，直接给空函数
  return replace.call(this, location, onComplete, () => {});
};

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
      //meta用来设置登陆注册时隐藏footer
      meta: {
        isHide: true,
      },
    },
    {
      path: "/register",
      component: Register,
      meta: {
        isHide: true,
      },
    },
    {
      name: "search", //配合$router.push传递可选参数
      //后面加问号代表params参数是可选的
      path: "/search/:searchText?",
      component: Search,
    },
    {
      path: "/detail/:id",
      component: Detail,
    },
  ],
});
