// 汇总所有vuex的模块
import { reDoodsList } from "@api/search";

// 统一暴露
export default {
  state: {
    allgoodsLists: {
      trademarkList: [], //品牌图片
      attrsList: [], //品牌属性
      goodsList: [], //具体品牌清单
    },
  },
  getters: {
    //方便拿取数据
    trademarkList(state) {
      return state.allgoodsLists.trademarkList;
    },
    attrsList(state) {
      return state.allgoodsLists.attrsList;
    },
    goodsList(state) {
      return state.allgoodsLists.goodsList;
    },
  },
  actions: {
    //默认接受回来一个空对象
    async getDoodsList({ commit }, data = {}) {
      //使用await等待reDoodsList请求回来的具体数据，请求回来后调用mutation方法
      const allgoodsLists = await reDoodsList(data);
      commit("GET_DOODS_LIST", allgoodsLists);
    },
  },
  mutations: {
    GET_DOODS_LIST(state, allgoodsLists) {
      state.allgoodsLists = allgoodsLists;
    },
  },
};
