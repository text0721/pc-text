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
        <form action="">
          <input type="text" />
          <button>搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
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
