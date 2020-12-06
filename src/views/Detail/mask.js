//获取存储中图的容器，绑定mosemove事件
const oPreview = document.getElementsByClassName("spec-preview")[0];
//分别获取大图区、中图区元素、蒙版区元素
const oBigArea = document.getElementsByClassName("big")[0];
const oBigImg = document.getElementsByClassName("bigImg")[0];

const oMiddleImg = document.getElementsByClassName("event")[0];
const oMask = document.getElementsByClassName("mask")[0];

console.log(oPreview, oBigArea, oBigImg, oMiddleImg, oMask);
//鼠标移动的时候获取鼠标点击事件的各个定位
oPreview.onmousemove = function(e) {
  //获取鼠标到蒙版的距离=鼠标到视口的距离-oMiddleImg到视口的距离
  const mouseTowindow = {
    x: e.clientX - oMiddleImg.getBoundingClientRect().left,
    y: e.clientY - oMiddleImg.getBoundingClientRect().top,
  };
  // console.log(mouseTowindow);
  //鼠标始终保持在蒙版中心
  const oMaskHalf = {
    x: oMask.offsetWidth / 2,
    y: oMask.offsetHeight / 2,
  };
  //求蒙版移动的距离
  const oMaskMove = {
    x: mouseTowindow.x - oMaskHalf.x,
    y: mouseTowindow.y - oMaskHalf.y,
  };
  //判断蒙版是否已超出界限
  if (oMaskMove.x >= oMiddleImg.offsetWidth - oMask.offsetWidth) {
    oMaskMove.x = oMiddleImg.offsetWidth - oMask.offsetWidth;
  } else if (oMaskMove.x <= 0) {
    oMaskMove.x = 0;
  }
  if (oMaskMove.y >= oMiddleImg.offsetHeight - oMask.offsetHeight) {
    oMaskMove.y = oMiddleImg.offsetHeight - oMask.offsetHeight;
  } else if (oMaskMove.y <= 0) {
    oMaskMove.y = 0;
  }
  oMask.style.left = oMaskMove.x + "px";
  oMask.style.top = oMaskMove.y + "px";

  //计算比例=大图可走的距离/小图可走的距离=（大图区域clientwidth-大图片的offsetwidth）/（小图区域clientwidth-蒙版的offsetwidth）
  let oScale =
    (oBigArea.clientWidth - oBigImg.offsetWidth) /
    (oMiddleImg.clientWidth - oMask.offsetWidth);
  //则大图可移动的距离 = 小图可走的距离 * 比例
  const oBigimgMove = {
    x: oMaskMove.x * oScale,
    y: oMaskMove.y * oScale,
  };
  oBigImg.style.left = oBigimgMove.x + "px";
  oBigImg.style.top = oBigimgMove.y + "px";
};
//鼠标移出的时候清除蒙版和大图
oPreview.onmouseleave = function() {
  oMiddleImg.removeChild(oMask);
  oPreview.removeChild(oBigArea);
};
