<template>
  <div>
    手机号<input type="text" v-model="phone" /><br />
    密码<input type="password" v-model="password" /><br />
    <button @click="login">登录</button>
  </div>
</template>

<script>
import { reqLogin } from "@api/user";

export default {
  name: "Login",
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    //定义点击登录函数发送登录请求
    login() {
      reqLogin(this.phone, this.password)
        .then((res) => {
          console.log("成功", res);
          this.$router.push("/");
        })
        .catch((err) => {
          window.alert(err)
          // console.log("失败", err);
        });
    },
  },
};
</script>

<style scoped>
</style>
