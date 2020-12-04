<template>
  <div>
    <!-- 三级分类列表 -->
    <TypeNav />

    <div class="main">
      <div class="py-container">
        <!-- 已选商品的类别 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="searchgoodList.keyword">
              关键字:{{ searchgoodList.keyword }}<i @click="delKeyword">×</i>
            </li>
            <li class="with-x" v-show="searchgoodList.categoryName">
              分类:{{ searchgoodList.categoryName
              }}<i @click="delCategoryName">×</i>
            </li>
            <li class="with-x" v-show="searchgoodList.trademark">
              品牌:{{ searchgoodList.trademark.split(":")[1]
              }}<i @click="delTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(prop, index) in searchgoodList.props"
              :key="prop"
            >
              {{ prop.split(":")[2] }}:{{ prop.split(":")[1] }}
              <i @click="delProp(index)">×</i>
            </li>
            <!-- <li class="with-x">属性:22222<i @click="delProp">×</i></li> -->
          </ul>
        </div>

        <!-- 选择商品的类别 -->
        <SearchSelector :addTrademark="addTrademark" @add-prop="addProp" />

        <!-- 具体商品列表导航 -->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!--setOrder传递的order是1就是综合排序，是2就是价格排序  -->
                <li
                  :class="{
                    active: setOrderType('1'),
                  }"
                >
                  <a @click="setOrder(`1`)"
                    >综合
                    <i
                      :class="{
                        iconfont: true,
                        'icon-xiangxia1': isAllDown,
                        'icon-xiangshang1': !isAllDown,
                      }"
                    >
                    </i>
                  </a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li
                  :class="{
                    active: setOrderType('2'),
                  }"
                  @click="setOrder(`2`)"
                >
                  <a class="font"
                    >价格
                    <span>
                      <!-- searchgoodList.order.indexOf('2') > -1 判断两者上下键都是显示的 -->
                      <!-- isPriceDown判断到底那个是被激活的 -->
                      <i
                        :class="{
                          iconfont: true,
                          'icon-xiangshang': true,
                          deactive: setOrderType('2') && isPriceDown,
                        }"
                      ></i>
                      <i
                        :class="{
                          iconfont: true,
                          'icon-xiangxia': true,
                          deactive: setOrderType('2') && !isPriceDown,
                        }"
                      ></i>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link target="_blank" :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp;</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link
                      :to="`/detail/${goods.id}`"
                      target="_blank"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</router-link
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            @current-change="handleCurrentChange"
            :current-page="searchgoodList.pageNo"
            :pager-count="7"
            :page-size="5"
            :total="total"
          />
          <!-- background
            :page-size="9" 每页显示条目个数
            page-sizes     每页显示个数选择器的选项设置
            page-count     总页数
            pager-count    页码按钮的数量，当总页数超过该值时会折叠
            current-page   当前页数
            layout="prev, pager, next" 组件布局
            popper-class   每页显示个数选择器的下拉框类名
            prev-text      替代图标显示的上一页文字
            next-text      替代图标显示的下一页文字
            :total="1000"
            size-change    pageSize改变时会触发,每页条数
            current-change  currentPage改变时会触发,当前页
            prev-click
            next-click
          -->
          <!-- <el-pagination
            background
            :page-size="5"
            :page-sizes="[5, 10, 15, 20]"
            :pager-count="7"
            :current-page="searchgoodList.pageNo"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="
              prev, 
              pager, 
              next,
              total, 
              sizes, 
              jumper"
            :total="total"
          >
          </el-pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import SearchSelector from "@views/Search/SearchSelector";
import TypeNav from "@comps/TypeNav";
import Pagination from "@comps/Pagination";

//引入获取商品详情的api方法
// import { reqGoodsDtail } from "@api/home";

export default {
  name: "Search",
  data() {
    return {
      searchgoodList: {
        category1Id: "1111", // 一级分类id
        category2Id: "", // 二级分类id
        category3Id: "", // 三级分类id
        categoryName: "", // 分类名称
        keyword: "", // 搜索内容（搜索关键字）
        order: "1:desc", // 排序方式：1：综合排序  2：价格排序   asc 升序  desc 降序
        pageNo: 1, // 分页的页码（第几页）
        pageSize: 5, // 分页的每页商品数量
        props: [], // 商品属性
        trademark: "", // 品牌
      },
      isAllDown: true, //综合排序默认降序
      isPriceDown: false, //价格排序默认升序
    };
  },
  computed: {
    ...mapState({
      //记得把值的结果return
      goodsDetail: (state) => state.detail.goodsDetail,
    }),
    ...mapGetters(["goodsList", "total"]),
  },
  methods: {
    ...mapActions(["getGoodsList"]),

    //封装根据路径发送请求的函数
    updatePath(pageNo = 1) {
      //结构searchText，并重新更名为keyword
      const { searchText: keyword } = this.$route.params;
      const {
        categoryName,
        category1Id,
        category2Id,
        category3Id,
      } = this.$route.query;

      const searchgoodList = {
        ...this.searchgoodList,
        keyword, //以下会覆盖掉上行最开始的初始化参数
        categoryName,
        category1Id,
        category2Id,
        category3Id,
        pageNo,
      };
      this.searchgoodList = searchgoodList;
      this.getGoodsList(searchgoodList);
      // console.log(this.$store);
    },
    // 删除关键字
    delKeyword() {
      this.searchgoodList.keyword = "";
      // 清空header组件搜索内容的searchText，即keyword
      this.$bus.$emit("clearKeyword");
      this.$router.replace({
        name: "search",
        query: this.$route.query,
      });
    },
    //删除query参数的分类CategoryName
    delCategoryName() {
      this.searchgoodList.categoryName = "";
      this.searchgoodList.category1Id = "";
      this.searchgoodList.category2Id = "";
      this.searchgoodList.category3Id = "";
      this.$router.replace({
        name: "search",
        params: this.$route.params,
      });
    },
    // 添加品牌
    addTrademark(trademark) {
      //判断如果品牌存在就不再重新发请求
      if (this.searchgoodList.trademark) return;
      this.searchgoodList.trademark = trademark;
      this.updatePath();
    },
    //删除品牌
    delTrademark() {
      this.searchgoodList.trademark = "";
      this.updatePath();
    },
    //添加品牌属性
    addProp(prop) {
      //判断如果品牌属性存在就不能再继续添加
      if (this.searchgoodList.props.indexOf(prop) > -1) return;
      this.searchgoodList.props.push(prop);
      this.updatePath();
    },
    //删除品牌属性
    delProp(index) {
      this.searchgoodList.props.splice(index, 1);
      this.updatePath();
    },

    //设置商品排序的方式：默认综合排序，降序 1:desc
    setOrder(order) {
      //如果传入的order是1，表示是进入的综合排序
      //如果传入的order是2，表示是进入的价格排序
      let [orderNum, orderType] = this.searchgoodList.order.split(":");
      //传递的参数是字符串格式，记得不要写成num格式的了

      if (order === "1") {
        //判断是综合排序时，如果order=orderNum，则表示是综合排序重复点击，排序跟图标都要取反
        // 如果不等，表示是第一次点击，保持跟图标isAllDown一致就行
        if (order === orderNum) {
          this.isAllDown = !this.isAllDown;
          orderType = orderType === "desc" ? "asc" : "desc";
        } else {
          orderType = this.isAllDown ? "desc" : "asc";
        }
      } else {
        //判断当前是价格排序时，如果order=orderNum，表示是价格排序重复点击,排序跟图标都要取反
        //如果不等，就表示是第一次点击，默认价格升序，显示升序图标
        if (order === orderNum) {
          this.isPriceDown = !this.isPriceDown;
          orderType = orderType === "desc" ? "asc" : "desc";
        } else {
          this.isPriceDown = false;
          orderType = "asc";
        }
      }
      this.searchgoodList.order = `${order}:${orderType}`;
      this.updatePath();
    },
    //封装判断排序是以什么开头，是综合排序还是价格排序
    setOrderType(order) {
      return this.searchgoodList.order.indexOf(order) > -1;
    },

    // 当每页条数发生变化触发
    handleSizeChange(pageSize) {
      this.options.pageSize = pageSize;
      this.updatePath();
    },
    // 当页码发生变化触发
    handleCurrentChange(pageNo) {
      this.updatePath(pageNo);
    },
  },
  watch: {
    $route: {
      //根据路径变化随时更新搜索请求
      handler() {
        this.updatePath();
      },
      immediate: true,
    },
  },
  mounted() {
    // this.updatePath(); //根据路径搜索商品，放在watch里面更方便，
  },
  components: {
    TypeNav,
    SearchSelector,
    Pagination,
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                i {
                  font-size: 14px;
                }
              }
              .font {
                display: flex;
                span {
                  display: flex;
                  flex-direction: column;
                  line-height: 10px;
                  i {
                    font-size: 12px;
                    &.deactive {
                      color: rgba(255, 255, 255, 0.4);
                    }
                  }
                }
              }

              &.active {
                display: flex;
                justify-content: space-around;
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
