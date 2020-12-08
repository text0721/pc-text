<template>
  <div>
    <div class="cart">
      <h4>全部商品</h4>
      <div class="cart-main">
        <div class="cart-th">
          <div class="cart-th1">全部</div>
          <div class="cart-th2">商品</div>
          <div class="cart-th3">单价（元）</div>
          <div class="cart-th4">数量</div>
          <div class="cart-th5">小计（元）</div>
          <div class="cart-th6">操作</div>
        </div>
        <div class="cart-body">
          <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
            <li class="cart-list-con1">
              <input
                type="checkbox"
                name="chk_list"
                :checked="cart.isChecked"
                @change="updateIsChecked(cart.skuId, !cart.isChecked)"
              />
            </li>
            <li class="cart-list-con2">
              <img :src="cart.imgUrl" />
              <div class="item-msg">
                {{ cart.skuName }}
              </div>
            </li>
            <li class="cart-list-con3">
              <div class="item-txt">语音升级款</div>
            </li>
            <li class="cart-list-con4">
              <span class="price">{{ cart.skuPrice }}</span>
            </li>
            <li class="cart-list-con5">
              <button
                href="javascript:void(0)"
                class="mins"
                :disabled="cart.skuNum === 1"
                @click="updateChartCount(cart.skuId, -1, cart.skuNum)"
              >
                -
              </button>
              <input
                autocomplete="off"
                type="number"
                :value="cart.skuNum"
                @blur="updateSkuNum(cart.skuId, cart.skuNum, $event)"
                @input="formatSkuNum"
                minnum="1"
                class="itxt"
              />
              <button
                href="javascript:void(0)"
                class="plus"
                :disabled="cart.skuNum === 10"
                @click="updateChartCount(cart.skuId, 1, cart.skuNum)"
              >
                +
              </button>
            </li>
            <li class="cart-list-con6">
              <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
            </li>
            <li class="cart-list-con7">
              <a class="sindelet" @click="delCart(cart.skuId)">删除</a>
              <br />
              <a href="#none">移到收藏</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="cart-tool">
        <div class="select-all">
          <input class="chooseAll" type="checkbox" v-model="AllChecked" />
          <span>全选</span>
        </div>
        <div class="option">
          <a href="#none">删除选中的商品</a>
          <a href="#none">移到我的关注</a>
          <a href="#none">清除下柜商品</a>
        </div>
        <div class="money-box">
          <div class="chosed">
            已选择 <span>{{ totalNum }}</span
            >件商品
          </div>
          <div class="sumprice">
            <em>总价（不含运费） ：</em>
            <i class="summoney">{{ totalPrice }}</i>
          </div>
          <div class="sumbtn">
            <router-link to="/trade" class="sum-btn" target="_blank"
              >结算</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {
      disabledAdd: false,
      disabledCut: false,
    };
  },
  computed: {
    ...mapState({
      cartList: (state) => state.shopcart.cartList,
    }),
    ...mapGetters(["AllIsChecked"]),
    //计算已选中的商品总数量
    totalNum() {
      return this.cartList
        .filter((cart) => cart.isChecked === 1)
        .reduce((p, c) => p + c.skuNum, 0);
    },
    //计算已选中商品的总价
    totalPrice() {
      return this.cartList
        .filter((cart) => cart.isChecked === 1)
        .reduce((p, c) => p + c.skuNum * c.skuPrice, 0);
    },

    //设置全选按钮，计算input的值
    AllChecked: {
      get() {
        return this.AllIsChecked === this.cartList.length;
      },
      set(isChecked) {
        this.$store.commit("ALL_CART_CHECKED", isChecked);
      },
    },
  },
  methods: {
    ...mapActions([
      "getShopCart",
      "updateCartCount",
      "updateCartChecked",
      "delShopCart",
    ]),
    //绑定input事件，格式化用户输入的数量不规范,非数字都替换成空，再触发失去焦点事件updateSkuNum
    formatSkuNum(e) {
      let skuNum = +e.target.value.replace(/\D+/g, "");
      if (skuNum < 1) {
        // this.disabledCut = true;
        skuNum = 1;
      } else if (skuNum > 10) {
        // this.disabledAdd = true;
        //假设仓库库存数量是10
        skuNum = 10;
      } else {
        // this.disabledCut = false;
        // this.disabledAdd = false;
      }
      // e.target.value = skuNum;
      // if (+e.target.value < 1) {
      //   e.target.value = 1;
      // }
      // if (+e.target.value > 10) {
      //   e.target.value = 10;
      // }
    },
    updateSkuNum(skuId, skuNum, e) {
      //用户直接输入数量，失去焦点时，根据旧的skuNum值，计算应该发送请求增加/减少真正的skuNum值
      //请求的实际数量= 失去焦点后 - 失去焦点前 = e.target.value - skuNum
      if (+e.target.value === skuNum) return;
      this.updateCartCount({ skuId, skuNum: e.target.value - skuNum });
    },
    //加减更新商品数量
    async updateChartCount(skuId, skuNum) {
      //一定记得多个参数要用对象的方式传递过去
      await this.updateCartCount({ skuId, skuNum });
    },
    //切换更改商品是否选中
    updateIsChecked(skuId, isChecked) {
      this.updateCartChecked({ skuId, isChecked: isChecked ? 1 : 0 });
    },
    //删除单个商品
    delCart(skuId) {
      this.delShopCart(skuId);
    },
  },
  mounted() {
    this.getShopCart();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>

