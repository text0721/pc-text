// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";

import store from "@store/index";

// import Home from "@views/Home";
// import Login from "@views/Login";
// import Register from "@views/Register";
// import Search from "@views/Search";
// import Detail from "@views/Detail";
// import AddCartSuccess from "@views/AddCartSuccess";
// import ShopCart from "@views/ShopCart";
// import Trade from "../views/Trade";
// import Pay from "../views/Pay";
// import PaySuccess from "../views/PaySuccess";
// import Center from "../views/Center";
//配置路由懒加载，路径必须是全名字，不可用路径别名
const Home = () => import(/* webpackChunkName: "Home" */ "../views/Home");
const Login = () => import(/* webpackChunkName: "Login" */ "../views/Login");
const Register = () =>
  import(/* webpackChunkName: "Register" */ "../views/Register");
const Search = () => import(/* webpackChunkName: "Search" */ "../views/Search");
const Detail = () => import(/* webpackChunkName: "Detail" */ "../views/Detail");
const AddCartSuccess = () =>
  import(/* webpackChunkName: "AddCartSuccess" */ "../views/AddCartSuccess");
const ShopCart = () =>
  import(/* webpackChunkName: "ShopCart" */ "../views/ShopCart");
const Trade = () => import(/* webpackChunkName: "Trade" */ "../views/Trade");
const Pay = () => import(/* webpackChunkName: "Pay" */ "../views/Pay");
const PaySuccess = () =>
  import(/* webpackChunkName: "PaySuccess" */ "../views/PaySuccess");
const Center = () => import(/* webpackChunkName: "Center" */ "../views/Center");

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

const router = new VueRouter({
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
      name: "detail",
      path: "/detail/:id",
      component: Detail,
    },
    {
      name: "addcartsuccess",
      //添加到购物车页面成功状态
      path: "/addcartsuccess",
      component: AddCartSuccess,
      //路由守卫，如果路由不是从detail过来的，就跳往购物车页面
      // beforeEnter: (to, from, next) => {
      //   if (from.name === "detail") next();
      //   next("/shopcart");
      // },
    },
    {
      name: "shopcart",
      //跳转至购物车列表
      path: "/shopcart",
      component: ShopCart,
    },
    {
      name: "pay",
      //跳转至支付界面
      path: "/pay",
      component: Pay,
    },
    {
      name: "paysuccess",
      //跳转至支付成功
      path: "/paysuccess",
      component: PaySuccess,
    },
    {
      name: "center",
      //跳转至订单界面
      path: "/center",
      component: Center,
    },
    {
      name: "trade",
      //跳转至订单交易详情
      path: "/trade",
      component: Trade,
    },
  ],
  // 设置每次切换路由时，页面滚动条的位置
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

//全局守卫，先保存没有权限的路径为数组，方便后期直接添加
const permissionPaths = ["/trade", "/pay", "/center"];
router.beforeEach((to, from, next) => {
  // 判断路由是不是去往这几个路由，没有携带token就要去登录，携带了就可以去相应的地址
  if (permissionPaths.indexOf(to.path) > -1 && !store.state.user.token) {
    return next("/login");
  }
  next(); //携带了就跳往对应的地址
});
export default router;
