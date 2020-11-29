<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort">
        <div class="all-sort-list2">
          <div
            class="item bo"
            v-for="lists in CategoryList"
            :key="lists.categoryId"
          >
            <h3>
              <!-- 一级 -->
              <a href="">{{ lists.categoryName }}</a>
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
                    <a href="">{{ list2.categoryName }}</a>
                  </dt>
                  <dd>
                    <em>
                      <!-- 三级 -->
                      <a
                        href=""
                        v-for="list3 in list2.categoryChild"
                        :key="list3.categoryId"
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
    </div>
  </div>
</template>

<script>
import { reqGetBaseCategoryList } from "@api/home";
export default {
  //该组件因为要在search中也要用，定义成公共组件
  name: "TypeNav",
  data() {
    return {
      // 初始化遍历的响应式数据
      CategoryList: [],
    };
  },
  async mounted() {
    const result = await reqGetBaseCategoryList();
    this.CategoryList = result.slice(0, 16);
  },
  // mounted() {
  //请求响应式数据方法2,在挂在期直接reqGetBaseCategoryList()
  //   reqGetBaseCategoryList()
  //     .then((res) => {
  //       this.CategoryList = res.slice(0, 16);
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
      background: #fafafa;
      z-index: 999;

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
