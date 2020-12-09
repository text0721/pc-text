<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              $route.query.orderID
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥17,654</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li
              v-for="(img, index) in payStyle"
              :key="index"
              v-show="index === 0 || index === 1"
              :class="{ selected: img.checked || index === defaultIndex }"
              @click="imgClick(img, index)"
            >
              <!-- 图片的src路径循环的时候，必须写在public才会被解析，放在views解析不了 -->
              <img :src="img.imgsrc" />
            </li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li
                v-for="(img, index) in payStyle"
                :key="index"
                v-show="index > 1"
                :class="{ selected: img.checked }"
                @click="imgClick(img, index)"
              >
                {{ img.src }}
                <img :src="img.imgsrc" />
              </li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <el-button type="text" class="btn" @click="paying"
            >立即支付</el-button
          >
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//生成二维码的库
import QRCode from "qrcode";
import { reqGetQRCode, reqOrderList } from "@api/pay";
export default {
  name: "Pay",
  data() {
    return {
      defaultIndex: 1, //默认index是1选择微信
      payStyle: [
        { imgsrc: "./images/pay2.jpg", checked: false },
        { imgsrc: "./images/pay3.jpg", checked: false },
        { imgsrc: "./images/pay10.jpg", checked: false },
        { imgsrc: "./images/pay11.jpg", checked: false },
        { imgsrc: "./images/pay12.jpg", checked: false },
        { imgsrc: "./images/pay13.jpg", checked: false },
        { imgsrc: "./images/pay14.jpg", checked: false },
        { imgsrc: "./images/pay15.jpg", checked: false },
        { imgsrc: "./images/pay16.jpg", checked: false },
        { imgsrc: "./images/pay17.jpg", checked: false },
        { imgsrc: "./images/pay18.jpg", checked: false },
        { imgsrc: "./images/pay19.jpg", checked: false },
        { imgsrc: "./images/pay20.jpg", checked: false },
      ],
    };
  },
  watch: {
    // 监视点击的支付方式，根据不同的方式请求不同的支付接口
    defaultIndex() {},
  },
  methods: {
    //设置选择支付方式的点击切换
    imgClick(img, index) {
      //设置点击哪个支付方式就选中支付方式添加class选中
      this.defaultIndex = index;
      let pay = this.payStyle;
      if (pay && pay.length) {
        pay.forEach((res) => {
          res.checked = false;
        });
        img.checked = true;
      }
    },
    // 点击选择支付跳出相应支付方式的二维码
    async paying() {
      //如果选择的是微信支付，就弹出支付
      if (this.defaultIndex === 1) {
        // 获取请求的二维码图片
        const res = await reqGetQRCode(this.$route.query.orderID);

        // 转换二维码
        QRCode.toDataURL(res.codeUrl)
          .then((url) => {
            // console.log(this.$route.query.orderId);
            this.$alert(
              `<img src="${url}" alt="qrcode"/>`,
              "请用微信扫码支付",
              {
                confirmButtonText: "我已成功支付",
                cancelButtonText: "支付过程中出现问题",
                showClose: false, //右上角的X
                showCancelButton: true, // 是否显示取消按钮
                dangerouslyUseHTMLString: true, // 解析html
                center: true,
              }
            )
              .then(() => {
                // 表示点击了成功按钮
                this.$message({
                  type: "success",
                  message: "您已成功!",
                });
                reqOrderList().then(() => {
                  this.$router.push("/center");
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "您已取消",
                });
              });
          })
          .catch(() => {
            this.$message.error("支付遇到了问题，请重新试试");
          });
      } else {
        window.alert("请选择微信支付");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;
        .payType {
          .selected {
            border-color: #e1251b;
          }

          .selected::after {
            display: block;
          }
        }

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>