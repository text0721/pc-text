// home组件的vuex状态
import { reqGetBaseCategoryList, reqGetBanners, reqGetFloors } from "@api/home";

export default {
  state: {
    categoryList: [], // 首页三级分类列表数据
    banners: [], // 首页轮播图数据(模拟数据)
    floors: [], // 首页楼层数据(模拟数据)
  },
  getters: {},
  actions: {
    // 获取首页三级分类列表数据
    async getBaseCategoryList({ commit }) {
      // 发送请求
      const categoryList = await reqGetBaseCategoryList();
      // 触发mutation函数
      commit("GET_CATEGORY_LIST", categoryList);
    },
    //获取banners的请求
    async getBanners({ commit }) {
      const banners = await reqGetBanners();
      commit("GET_BANNERS", banners);
    },
    //获取floors的请求
    async getFloors({ commit }) {
      const floors = await reqGetFloors();
      commit("GET_FLOORS", floors);
    },
  },
  mutations: {
    GET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    //给state添加请求回来的首页图片轮播的数据图片
    GET_BANNERS(state, banners) {
      state.banners = banners;
    },
    //给state添加请求回来的楼层的模拟数据图片
    GET_FLOORS(state, floors) {
      state.floors = floors;
    },
  },
};
