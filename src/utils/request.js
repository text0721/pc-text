import axios from "axios";

const instance = axios.create({
  baseURL: "http://182.92.128.115/api/",
  header: {
    // token: '' // 不可以设置公共参数，此项目登录注册接口不需要
  },
});

//设置请求拦截器
instance.interceptors.request.use(
  (config) => {
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

    //判断code来提示后面的成功和失败具体怎么处理
    if (res.data.code === 200) {
      // console.log("请求成功", res);
      return res.data.data;
    }
    //功能失败，就相当于响应实际上还是失败，调用失败的promise
    return Promise.reject(res.data.message);
  },
  (err) => {
    //响应失败就直接返回失败的promise
    const message = err.message || "网络异常";
    return Promise.reject(message);
  }
);

export default instance;
