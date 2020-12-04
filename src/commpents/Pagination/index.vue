<template>
  <div class="pagination">
    <button>上一页</button>
    <button @click="setmyCurrentPage(1)">1</button>
    <button v-show="startEnd.start > 2">...</button>

    <button
      v-for="item in mapBtnsCount"
      :key="item"
      @click="setmyCurrentPage(startEnd.start + item - 1)"
    >
      {{ startEnd.start + item - 1 }}
    </button>

    <button>...</button>
    <button @click="setmyCurrentPage(totalPages)">
      {{ totalPages }}
    </button>
    <button>下一页</button>
    <button>总数：{{ total }}</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // 当前页码
    currentPage: {
      type: Number,
      default: 1,
    },
    // 显示展示的按钮数量
    pagerCount: {
      type: Number,
      validator(val) {
        // 验证，验证通过才会有用
        // 大于等于 5 且小于等于 21 的奇数
        // 返回true验证成功，
        // 返回false验证失败
        return val >= 5 && val <= 21 && val % 2 === 1;
      },
      default: 7,
    },
    // 每页显示的商品数量
    pageSize: {
      type: Number,
      default: 10,
    },
    // 总商品数量
    total: {
      type: Number,
      // required: true,
      default: 0,
    },
  },
  data() {
    return {
      // props数据是只读，当前页码数是变化
      myCurrentPage: this.currentPage,
    };
  },
  computed: {
    // 总页数=总数据数量/每页展示数量
    totalPages() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算除开首、尾的中间按钮的开始和结束的按钮值
    startEnd() {
      // 收集所有参与计算的参数
      const { myCurrentPage, pagerCount, totalPages } = this;

      // 中间start-end总计的按钮数量（不包含开头和结尾）
      const middleCount = pagerCount - 2;
      // 中间按钮数的一半
      const halfCount = Math.floor(middleCount / 2);

      let start, end;
      // 开始计算
      // 1 [2] 3 4 5 6 ...10
      // 1...3 4 [5] 6 7...10
      // 1 ... 5 6 7 8 [9] 10
      // 1 [2] 3
      // [1] --> 如果start大于总页数，不显示

      //如果当前点击的按钮数 >= 总显示的页码数 - 中间页码数的一半
      //即点击至末尾时，即myCurrentPage是偏末尾时，正常的start值应该是总页码-中间值一半
      // if (myCurrentPage >= totalPages - halfCount) {
      //   // 1 ... 5 6 7 8 [9] 10
      //   //开始值 = 总页码数 - (所有页码总数 - 2 )
      //   start = totalPages - middleCount;
      // } else {
      //   // 正常情况
      //   start = myCurrentPage - halfCount;
      // }
      start = myCurrentPage - halfCount;

      if (start <= 1) {
        // 1 [2] 3 4 5 6 ...10
        start = 2;
      }

      // 正常情况
      //结束值 = 开始值 + (所有页码总数 - 2 ) -1
      end = start + middleCount - 1;
      if (end >= totalPages) {
        // 1 [2] 3
        end = totalPages - 1;
      }
      // if (myCurrentPage >= pagerCount / 2 + 1) {
      //   end = totalPages - 1;
      // }

      // if (end >= totalPages) {
      //   // 1 [2] 3
      //   end = totalPages - 1;
      // }

      // 返回计算结果
      return {
        start,
        end,
      };
    },
    // 需要遍历的按钮数量
    mapBtnsCount() {
      const { start, end } = this.startEnd;
      const count = end - start + 1;
      return count >= 1 ? count : 0;
    },
  },
  watch: {
    // 让每次页码发生变化加载新数据
    myCurrentPage(currentPage) {
      // this.$listeners.currentChange(currentPage);
      this.$emit("current-change", currentPage);
    },
    // 当外面页面发生变化，里面页面也要变化
    currentPage(currentPage) {
      this.myCurrentPage = currentPage;
    },
  },
  methods: {
    setmyCurrentPage(currentPage) {
      this.myCurrentPage = currentPage;
      if (currentPage === "1") {
        this.myCurrentPage = "1";
      }
    },
  },
};
</script>

<style lang='less' scoped>
.pagination {
  display: flex;
  white-space: nowrap;
  font-weight: 700;
  button {
    margin: 0 5px;
    padding: 0 4px;
    font-size: 13px;
    min-width: 30px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: none;
    outline: none;
    display: block;
    background-color: #eeeefd;
    color: #606266;
    border-radius: 2px;
  }
}

button.active {
  background-color: #409eff;
  color: #fff;
}
</style>