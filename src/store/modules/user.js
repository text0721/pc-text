// 汇总所有vuex的模块
import { reqLogin, reqRegister } from "@api/user";

// 统一暴露
export default {
  state: {
      //保存token跟name，方便下次打开浏览器记住该账户自动登录
      name: localStorage.getItem("name") || "",
      token: localStorage.getItem("token") || "",
  },
  getters: {},
  actions: {
    //请求的注册
    async register({ commit }, { phone, password, code }) {
      await reqRegister({ phone, password, code });
      console.log(commit);
    },
    //请求的登录
    async login({ commit }, { phone, password }) {
      const user = await reqLogin(phone, password);
      commit("IS_LOGIN", user);
    },
  },
  mutations: {
    IS_LOGIN(state, user) {
      state.name = user.name;
      state.token = user.token;
    },
  },
};
