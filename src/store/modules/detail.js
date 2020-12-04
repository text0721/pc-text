// 汇总所有vuex的模块
import { reqGoodsDtail } from "@api/detail";

// 统一暴露
export default {
  state: {
    goodsDetail: {
      categoryView: {},//分类数据
      skuInfo: {}, //商品详情数据
      spuSaleAttrList: [], //商品选择属性
    },
  },
  getters: {
    //方便拿取数据
    categoryView(state) {
      return state.goodsDetail.categoryView;
    },
    skuInfo(state) {
      return state.goodsDetail.skuInfo;
    },
    spuSaleAttrList(state) {
      return state.goodsDetail.spuSaleAttrList;
    },
  },
  actions: {
    async getGoodsDetail({ commit }, id) {
      const goodsDetail = await reqGoodsDtail(id);
      commit("GET_GOODS_DETAIL", goodsDetail);
    },
  },
  mutations: {
    GET_GOODS_DETAIL(state, goodsDetail) {
      state.goodsDetail = goodsDetail;
    },
  },
};
