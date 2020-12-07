<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <validation-provider rules="phone|length|required" v-slot="{ errors }">
          <input
            type="text"
            placeholder="请输入你的手机号"
            v-model="user.phone"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </validation-provider>
      </div>
      <div class="content">
        <label>验证码:</label>
        <validation-provider rules="code|required" v-slot="{ errors }">
          <input
            type="text"
            placeholder="请输入验证码"
            name="code"
            v-model="user.code"
          />
          <!-- 获取验证码的是图片，每次发送请求更新图片src就是重新获取验证码了 -->
          <img
            src="http://182.92.128.115/api/user/passport/code"
            ref="refresh"
            alt="code"
            @click="refreshCode"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </validation-provider>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <validation-provider rules="password|required" v-slot="{ errors }">
          <input
            type="password"
            placeholder="请输入你的登录密码"
            name="密码"
            v-model="user.password"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </validation-provider>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <validation-provider rules="password|required" v-slot="{ errors }">
          <input
            type="password"
            placeholder="请输入确认密码"
            name="确认密码"
            v-model="user.repassword"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </validation-provider>
      </div>
      <div class="controls">
        <input type="checkbox" name="协议" v-model="user.isAgreen" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <!-- <span class="error-msg" v-if="!user.isAgreen">请同意相关协议</span> -->
      </div>
      <div class="btn">
        <button @click="isRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
//引入VeeValidate校验,组件实例注册ValidationProvider是局部引用
//Vuezhuce成公共组件就是全局注册
import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

//设置关于输入手机号的校验
extend("phone", {
  validate: (value) => {
    return /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(
      value
    );
  },
  message: "手机号不符合规范", // 错误信息，即使用组件中errors[0]的提示信息
});
extend("length", {
  validate(value) {
    return value.length === 11;
  },
  message: "长度必须为11位",
});
//这是内置的规则，上面都是自己写的规则
extend("required", {
  ...required,
  message: "此为必填项目",
});

//设置验证码校验
extend("code", {
  validate: (value) => {
    return /^\d{4}$/.test(value);
  },
  message: "验证码位数错误", // 错误信息，即使用组件中errors[0]的提示信息
});

//设置密码校验
extend("password", {
  validate: (value) => {
    return /^[A-Za-z]{1}[A-Za-z0-9]{6,12}/.test(value);
  },
  message: "请输入6-12位以字母开头，和数字组成的密码", // 错误信息，即使用组件中errors[0]的提示信息
});

export default {
  name: "Register",
  data() {
    return {
      user: {
        phone: "",
        code: "", //验证码
        password: "",
        repassword: "",
        isAgreen: false, //是否同意协议
      },
      isRegisterDone: false,
    };
  },
  methods: {
    //点击刷新验证码图片，即重新请求，重新赋值src
    refreshCode() {
      // 原本可以用事件做，但是注册失败后需要重新刷新页面，就只能用ref属性获取元素更好
      // e.target.src = "http://182.92.128.115/api/user/passport/code";
      this.$refs.refresh.src = "http://182.92.128.115/api/user/passport/code";
    },
    //点击注册完成注册
    async isRegister() {
      try {
        // 1、收集用户数据
        const { phone, code, password, repassword, isAgreen } = this.user;
        // 2、校验相关数据
        if (password != repassword) {
          this.$message.error("两次密码输入不一致");
          return;
        }
        if (!isAgreen) {
          this.$message.error("请同意相关用户协议");
          return;
        }
        //防止注册按钮重复点击
        if (this.isRegisterDone) return;
        this.isRegisterDone = true;
        // 3、发送注册请求，注册成功后才跳转登陆界面
        await this.$store.dispatch("register", { phone, password, code });
        console.log(phone, password);

        this.$router.push("/login");
      } catch (err) {
        this.isRegisterDone = false;
        // 4、失败就清空密码,重新输入用户名密码和验证码
        this.user.password = "";
        this.user.repassword = "";
        // 重新刷新验证码
        this.refreshCode();
      }
    },
  },
  components: {
    ValidationProvider,
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
        &.invalid {
          border: solid 1px red;
        }
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>