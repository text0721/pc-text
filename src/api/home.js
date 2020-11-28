import request from "@utils/request";

// 封装发送请求登录的功能函数
export const reqGetBaseCategoryList = () => {
  return request({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
};
