// home组件的vuex状态
import {
  reqShopCart,
  reqUpdateCartCount,
  reqUpdateCartChecked,
  reqDelShopCart,
} from "@api/shopcart";

export default {
  state: {
    cartList: [], // 获取所有购物车列表
  },
  getters: {},
  actions: {
    //请求获取所有购物车列表
    async getShopCart({ commit }) {
      const cartList = await reqShopCart();
      commit("GET_SHOP_CART", cartList);
    },
    //请求增、减购物车数量，无返回值
    async updateCartCount({ commit }, { skuId, skuNum }) {
      await reqUpdateCartCount(skuId, skuNum);
      commit("UPDATE_CART_COUNT", { skuId, skuNum });
    },
    //请求修改商品是否选中，无返回值
    async updateCartChecked({ commit }, { skuId, isChecked }) {
      await reqUpdateCartChecked(skuId, isChecked);
      console.log(commit);
      // commit("UPDATE_CART_CHECKED", { skuId, isChecked });
    },
    //请求删除某购物车列表，无返回值
    async delShopCart({ commit }, skuId) {
      await reqDelShopCart(skuId);
      console.log(commit);
      // commit("DEL_SHOP_CART", skuId);
    },
  },
  mutations: {
    GET_SHOP_CART(state, cartList) {
      state.cartList = cartList;
    },
    UPDATE_CART_COUNT(state, { skuId, skuNum }) {
      state.cartList = state.cartList.map((cart) => {
        if (cart.skuId === skuId) {
          cart.skuNum += skuNum;
        }
        return cart;
      });
    },
  },
};
