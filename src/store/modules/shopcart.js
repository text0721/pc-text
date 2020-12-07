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
  getters: {
    AllIsChecked(state) {
      return state.cartList.reduce((p, c) => p + (c.isChecked ? 1 : 0), 0);
    },
  },
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
      commit("UPDATE_CART_CHECKED", { skuId, isChecked });
    },

    //请求删除某购物车列表，无返回值
    async delShopCart({ commit }, skuId) {
      await reqDelShopCart(skuId);
      commit("DEL_SHOP_CART", skuId);
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
    UPDATE_CART_CHECKED(state, { skuId, isChecked }) {
      state.cartList = state.cartList.map((cart) => {
        if (cart.skuId === skuId) {
          cart.isChecked = isChecked;
        }
        return cart;
      });
    },
    //定义把所有的商品全选,组件直接调用
    ALL_CART_CHECKED(state, isChecked) {
      state.cartList.forEach((cart) => (cart.isChecked = isChecked ? 1 : 0));
    },
    DEL_SHOP_CART(state, skuId) {
      state.cartList = state.cartList.filter((cart) => cart.skuId !== skuId);
    },
  },
};
