import request from "@utils/request";

// 获取购物车列表
export const reqShopCart = () => {
  return request({
    method: "GET",
    url: "/cart/cartList",
  });
};

// 添加、减少到购物车列表
export const reqUpdateCartCount = (skuID, skuNum) => {
  return request({
    method: "POST",
    url: `/cart/addToCart/${skuID}/${skuNum}`,
  });
};

//切换商品选中状态
export const reqUpdateCartChecked = (skuId, isChecked) => {
  return request({
    method: "GET",
    url: `/cart/checkCart/${skuId}/${isChecked}`,
  });
};

// 删除购物车列表
export const reqDelShopCart = (skuId) => {
  return request({
    method: "DELETE",
    url: `/cart/deleteCart/${skuId}`,
  });
};
