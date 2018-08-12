webpackJsonp([4],{

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 获取应用实例
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  bindViewTap: function bindViewTap() {
    wx.navigateTo({
      url: '../user/user'
    });
  },
  onLoad: function onLoad() {}
});

/***/ })

},[121]); function webpackJsonp() { require("./../../common.js"); wx.webpackJsonp.apply(null, arguments); };