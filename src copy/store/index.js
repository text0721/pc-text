import Vue from "vue";
import Vuex from "vuex";

// import { reqGetBaseCategoryList } from "@api/home";
import modules from "./modules/search";

Vue.use(Vuex);

const state = {
    // categoryList: [], // 首页三级分类列表数据
};

const getters = {};

const actions = {
  // 获取首页三级分类列表数据
  // async getBaseCategoryList({ commit }) {
  //   //reqGetBaseCategoryList()返回的是promise，用await可以等到该函数的失败还是成功的具体响应数据结果
  //   const categoryList = await reqGetBaseCategoryList();
  //   commit("GET_CATEGORY_LIST", categoryList);
  // },
};

const mutations = {
  // GET_CATEGORY_LIST(state, categoryList) {
  //   state.categoryList = categoryList;
  // },
};

export default new Vuex.Store({
  state, // 总state
  getters, // 总getters
  actions, // 总actions
  mutations, // 总mutations
  modules, // 其他vuex模块的数据

  // modules: {可以具体写哪些组件中个各个模块store，但是用上面的方法冲突更少
  //   home: { // home的vuex数据
  //     state: {},
  //     getters: {},
  //     actions: {},
  //     mutations: {}
  //   },
  //   login: { // login的vuex数据
  //     state: {},
  //     getters: {},
  //     actions: {},
  //     mutations: {}
  //   }
  // }
});
