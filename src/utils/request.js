import axios from "axios";

import { Message } from "element-ui";
//引入临时用户的id放在请求头上面，以此获取购物车信息
import getUserTempId from "@utils/getUserTempId";

//引入store，这个store是整个store
import store from "../store";

// 引入进度条插件
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//引入生成唯一id的库
import { v4 as uuidv4 } from "uuid";

//在第一次发送请求，做拦截器处理的时候就生成未登录用户的临时id
// 每个userid都有自己对应的购物车数据，要存储在localStorage中永久存储

//请求之前缓存一份，这样以后请求都是读取的内存
const userTempId = getUserTempId();
const token = store.user.token;

const instance = axios.create({
  // baseURL: "http://182.92.128.115/api/",
  baseURL: "/api", //数据代理后
  header: {
    // token: '' // 不可以设置公共参数，此项目登录注册接口不需要
  },
});

//设置请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 开始进度条
    NProgress.start();

    //判断token存在不存在，存在就和临时Id一起传递，后台会自动合并购物车等数据
    if (token) {
      config.headers.token = token;
    }
    // 开始请求的时候携带唯一的id，方便后面获取该id的购物车列表
    // const userTempId = getUserTempId();放到外面缓存，免得每次请求都判断一次
    config.headers.userTempId = userTempId;

    return config;
  }
  //本来应该还有失败的回调
  // 源码中初始化Promise.resolve()返回默认成功的Promise，只会触发成功的回调
  // (err) => {},
);

// 设置响应拦截器
instance.interceptors.response.use(
  (res) => {
    //进入到这里只能代表请求响应成功了，但是功能可能没有实现，此时需要判断code：
    //  code：200——功能成功，其他的表示失败，具体看公司设置

    // 进度条结束
    NProgress.done();

    //判断code来提示后面的成功和失败具体怎么处理
    if (res.data.code === 200) {
      // console.log("请求成功", res);
      return res.data.data;
    }

    // 提示错误
    Message.error(res.data.message);
    //功能失败，就相当于响应实际上还是失败，调用失败的promise
    return Promise.reject(res.data.message);
  },
  (err) => {
    // 进度条结束
    NProgress.done();
    //响应失败就直接返回失败的promise
    const message = err.message || "网络异常";
    // 提示错误
    Message.error(message);
    return Promise.reject(message);
  }
);

export default instance;
