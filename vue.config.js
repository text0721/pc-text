// @ts-nocheck
const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //使用的是绝对路径，使用“path”，@views就是代表"src/views"路径
        "@views": path.resolve(__dirname, "src/views"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@comps": path.resolve(__dirname, "src/commpents"),
        "@store": path.resolve(__dirname, "src/store"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@api": path.resolve(__dirname, "src/api"),
      },
    },
  },
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "http://182.92.128.115",//目标服务器
  //       changeOrigin: true, // 允许跨域
  //     },
  //   },
  // },
};
