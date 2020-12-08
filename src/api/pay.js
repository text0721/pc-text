import request from "@utils/request";

// 封装发送搜索商品的功能函数
export const reqGetTrade = () => {
  return request({
    method: "GET",
    url: "/order/auth/trade",
  });
};
