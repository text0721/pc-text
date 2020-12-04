import request from "@utils/request";

//封装请求商品详情的方法
export const reqGoodsDtail = (id) => {
  return request({
    method: "GET",
    url: `/item/${id}`,
  });
};
