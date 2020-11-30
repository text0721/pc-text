<template>
  <header class="header">
    <div class="head">
      <div class="head-nav">
        <div class="head-nav-left">
          <p>尚品汇欢迎您 ！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="head-nav-right">
          <router-link to="/shop-order">我的订单</router-link>
          <router-link to="/shop-cart">我的购物车</router-link>
          <router-link to="/my-home">我的尚品汇</router-link>
          <router-link to="/my-vip">尚品汇会员</router-link>
          <router-link to="/com-buy">企业采购</router-link>
          <router-link to="/collect">关注尚品汇</router-link>
          <router-link to="/collaborate">合作招商</router-link>
          <router-link to="/backstage" class="last">商家后台</router-link>
        </div>
      </div>
    </div>
    <div class="head-log">
      <router-link class="logo" to="/">
        <img src="./images/logo.png" />
      </router-link>
      <div class="search">
        <form action="" @submit.prevent="search">
          <input type="text" v-model="searchText" />
          <button>搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    /*
        事件绑定在form中的原因：点击搜索，路径出现问号（原因是提交了表单）
         1. button 按钮如果没有type 那么在表单中 默认type就是submit
              此时会提交表单，事件就绑定在form上
                @submit.prevent="search"
            2. 不用form表单
                @click="search
    */
    // search() {
    //   //字符串方式添加搜索的可选参数
    //   //优化搜索为空就去掉"/"
    //   const searchParams = this.searchText ? "/" + this.searchText : "";
    //   const location = "/search" + searchParams;
    //   // console.log(location);
    //   // 编程式导航：原因将来要做搜索功能（要发送请求）
    //   this.$router.push(location + "?a=b&c=d");
    // },
    search() {
      const { searchText } = this;
      const location = {
        name: "search", //必须使用命名路由才可以传递params
        query: {
          name: "jack",
        },
      };
      if (searchText) {
        location.params = { searchText };
      }
      //对象方式添加可选参数
      this.$router.push(location); //重写push后可不报错
      // this.$router
      //   .push(location)
      //   .then((res) => {
      //     //处理成功的回调
      //     console.log("成功", res);
      //   })
      //   .catch((err) => {
      //     //处理失败的回调，一般不管的，仅防止重复搜索报错而已，不妨碍功能
      //     console.log("失败", err);
      //   });
      // this.$router.push(
      //   location,
      //   (res) => {
      //     console.log("成功", res);
      //   },
      //   (err) => {
      //     console.log("失败", err);
      //   }
      // );
    },
  },
};
</script>

<style scoped>
html,
body {
  width: 100%;
}
.header {
  width: 100%;
}
.head {
  background-color: #eaeaea;
}
.head-nav {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
  height: 30px;
  line-height: 30px;
}
.head-nav-left {
  display: flex;
  height: 16px;
  /* line-height: 16px; */
}
.head-nav-left p {
  color: #333;
}
.head-nav-left p:nth-child(1) {
  margin-right: 10px;
}
.head-nav-left p:nth-child(2) :hover {
  color: blue;
}
.register {
  margin-left: 5px;
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
}
.head-nav-right * {
  padding: 0 10px;
  border-right: 1px solid #b3aeae;
}
.last {
  border: 0;
}
.head-log {
  width: 1200px;
  height: 76px;
  line-height: 76px;
  margin: 0 auto;
}
.head-log {
  display: flex;
  justify-content: space-between;
}
.search input {
  width: 490px;
  height: 32px;
  box-sizing: border-box;
  border: 2px solid #ea4a36;
  outline: none;
  margin-top: 32px;
}
.search button {
  width: 68px;
  height: 32px;
  background-color: #ea4a36;
  border: none;
  cursor: pointer;
  outline: none;
  color: #fff;
  float: right;
  margin-top: 32px;
}
</style>
