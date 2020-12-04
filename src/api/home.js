import request from "@utils/request";
import mockRequest from "@utils/mockRequest";

// 封装首页三级分类数据请求函数
export const reqGetBaseCategoryList = () => {
  return request({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
};


// 模拟获取首页图片轮播
export const reqGetBanners = () => {
  return mockRequest({
    method: "GET",
    url: "/banners",
  });
};

// 模拟获取首页楼层图片数据
export const reqGetFloors = () => {
  return mockRequest({
    method: "GET",
    url: "/floors",
  });
};
