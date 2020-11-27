<template>
  <div class="footer">
    <div class="foot-main">
      <div class="foot-top">
        <div v-for="(item, index) in footTop" :key="index">
          <h4>{{ item.title }}</h4>
          <ul>
            <li v-for="(items, count) in item.liList" :key="count">
              {{ items }}
            </li>
          </ul>
        </div>
        <div>
          <div class="footerItem">
            <h4>帮助中心</h4>
            <img src="./imgs/wx_cz.jpg" />
          </div>
        </div>
      </div>
      <div class="foot-bot">
        <div class="about">
          <ul>
            <li v-for="(item, index) in about" :key="index">
              {{ item }}
              <span v-if="index < about.length - 1"></span>
            </li>
          </ul>
          <p>地址：北京市昌平区宏福科技园综合楼6层</p>
          <p>京ICP备19006430号</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      footTop: [
        {
          title: "购物指南",
          liList: [
            "购物流程",
            "会员介绍",
            "生活旅行/团购",
            "常见问题",
            "购物指南",
          ],
        },
        {
          title: "配送方式",
          liList: [
            "上门自提",
            "211限时达",
            "配送服务查询",
            "配送费收取标准",
            "海外配送",
          ],
        },
        {
          title: "支付方式",
          liList: ["货到付款", "在线支付", "分期付款", "邮局汇款", "公司转账"],
        },
        {
          title: "售后服务",
          liList: [
            "售后政策",
            "价格保护",
            "返修/退换货",
            "常见问题",
            "取消订单",
          ],
        },
        {
          title: "特色服务",
          liList: ["夺宝岛", "DIY装机", "延保服务", "尚品汇E卡", "尚品汇通信"],
        },
      ],
      about: [
        "关于我们",
        "联系我们",
        "关于我们",
        "商家入驻",
        "营销中心",
        "友情链接",
        "关于我们",
        "营销中心",
        "友情链接",
        "关于我们",
      ],
    };
  },
};
</script>

<style>
.footer {
  width: 100%;
  background-color: #eaeaea;
}
.foot-main {
  height: 323px;
  margin: 0 auto;
  width: 1200px;
  color: #333;
}
.foot-top {
  display: flex;
  justify-content: space-between;

  /* height: 208px; */
  padding: 20px 20px 20px 40px;
  border-bottom: 1px solid #b3aeae;
}
.foot-top li {
  /* height: 16px; */
  line-height: 18px;
}
.foot-top h4 {
  font-size: 14px;
}
.foot-bot {
  width: 1200px;
  height: 78px;
  padding: 20px;
}
.about {
  width: 1200px;
}
.about ul {
  display: flex;
  justify-content: center;
}
.about ul li {
  padding: 5px;
}
.about ul li span {
  margin-left: 10px;
  border-right: 1px solid #b3aeae;
}
.about p {
  width: 1200px;
  height: 15px;
  line-height: 15px;
  margin: 10px auto;
  text-align: center;
}
</style>
