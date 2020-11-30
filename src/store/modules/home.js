// home组件的vuex状态
import { reqGetBaseCategoryList } from "@api/home";

export default {
  state: {
    CategoryList: [], // 首页三级分类列表数据
  },
  getters: {},
  actions: {
    // 获取首页三级分类列表数据
    async GetBaseCategoryList({ commit }) {
      // 发送请求
      const CategoryList = await reqGetBaseCategoryList();
      // 触发mutation函数
      commit("GET_CATEGORY_LIST", CategoryList);
    },
  },
  mutations: {
    GET_CATEGORY_LIST(state, CategoryList) {
      state.CategoryList = CategoryList;
    },
  },
};
