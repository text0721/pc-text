import request from "@utils/request";

// 封装发送搜索商品的功能函数
export const reDoodsList = (data) => {
  return request({
    method: "POST",
    url: "/list",
    data,
  });
};
