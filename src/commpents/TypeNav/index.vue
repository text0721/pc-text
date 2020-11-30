<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2
        class="all"
        @mouseenter="isSearchShow = true"
        @mouseleave="isSearchShow = false"
      >
        全部商品分类
      </h2>
      <nav class="nav" @mouseleave="isSearchShow = false">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="search">
        <div class="sort" v-show="isHomeShow || isSearchShow">
          <div
            class="all-sort-list2"
            @mouseenter="isSearchShow = true"
            @mouseleave="isSearchShow = false"
          >
            <div
              class="item bo"
              v-for="lists in categoryList"
              :key="lists.categoryId"
              @click="goToSearch"
            >
              <h3>
                <!-- 一级 -->
                <a
                  :data-categoryName="lists.categoryName"
                  :data-categoryId="lists.categoryId"
                  :data-categoryType="1"
                  >{{ lists.categoryName }}</a
                >
                <!-- 方法1：使用router-link跳转，但是产生太多组件，页面性能不好 -->
                <!-- <router-link
                :to="`/search?categoryName=${lists.categoryName}&category1Id=${lists.categoryId}`"
                >{{ lists.categoryName }}</router-link
              > -->
                <!-- 方法2：编程式导航，但是每个item都会被绑定一次事件 -->
                <!-- <a
                @click.prevent="
                  $router.push({
                    name: 'search',
                    query: {
                      categoryName: lists.categoryName,
                      category1Id: lists.categoryId,
                    },
                  })
                "
                >{{ lists.categoryName }}</a
              > -->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="list2 in lists.categoryChild"
                    :key="list2.categoryId"
                  >
                    <dt>
                      <!-- 二级 -->
                      <a
                        :data-categoryName="list2.categoryName"
                        :data-categoryId="list2.categoryId"
                        :data-categoryType="2"
                        >{{ list2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em>
                        <!-- 三级 -->
                        <a
                          v-for="list3 in list2.categoryChild"
                          :key="list3.categoryId"
                          :data-categoryName="list3.categoryName"
                          :data-categoryId="list3.categoryId"
                          :data-categoryType="3"
                          >{{ list3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import { reqGetBaseCategoryList } from "@api/home";//此方法是未运用vuex的方法
import { mapState, mapActions } from "vuex";
export default {
  //该组件因为要在search中也要用，定义成公共组件
  name: "TypeNav",
  data() {
    return {
      isHomeShow: this.$route.path === "/",
      isSearchShow: false,
    };
  },
  mounted() {
    //判断当前是否已有请求好的数据，如果有就不再发送请求了
    if (this.categoryList.length) return;
    // 调用vuex的action函数
    this.getBaseCategoryList();
  },
  computed: {
    // ...mapState(["categoryList"]),
    ...mapState({
      categoryList: (state) => state.home.categoryList.slice(0, 15),
    }),
  },
  methods: {
    ...mapActions(["getBaseCategoryList"]),

    //定义把点击内容的id，名字，类型等作为parame参数显示在url上面
    //运用自定义属性的方式获取每个需要的值，再把值放在params上面
    //运用事件委托，这样事件只绑定一次就够了
    goToSearch(e) {
      // dataset是元素自定义属性对象
      const { categoryname, categoryid, categorytype } = e.target.dataset;
      //判断是否殿中a标签才跳转，点击空白地方不跳转
      if (!categoryname) return;

      //点击标签后立马隐藏列表
      this.isSearchShow = false;
      const location = {
        name: "search",
        query: {
          categoryName: categoryname,
          [`category${categorytype}Id`]: categoryid,
        },
      };
      //判断是否有params参数，有就加上
      const { searchText } = this.$route.params;
      if (searchText) {
        location.params = { searchText };
      }
      this.$router.push(location);
    },
  },

  // data() {
  //   return {
  //     // 初始化遍历的响应式数据
  //     categoryList: [],
  //   };
  // },
  // async mounted() {
  //   const result = await reqGetBaseCategoryList();
  //   this.categoryList = result.slice(0, 16);
  // },
  // mounted() {
  //请求响应式数据方法2,在挂在期直接reqGetBaseCategoryList()
  //   reqGetBaseCategoryList()
  //     .then((res) => {
  //       this.categoryList = res.slice(0, 16);
  //       // console.log("成功", res);
  //     })
  //     .catch((err) => {
  //       console.log("失败", err);
  //     });
  // },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: rgb(247, 209, 217);
      z-index: 999;
      // 设置全部商品分类的淡入淡出效果
      &.search-enter-active {
        transition: height 0.5s;
        overflow: hidden;
      }
      &.search-enter {
        height: 0px;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
