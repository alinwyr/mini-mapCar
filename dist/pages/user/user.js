webpackJsonp([2],{

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t))
// 获取应用实例
var app = getApp(); //  eslint-disable-line no-undef

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function onLoad() {
    var _this = this;

    app.request('user', {
      name: 11
    }).then(function (res) {
      _this.setData({
        motto: res.motto
      });
    });
  }
});

/***/ })

},[124]); function webpackJsonp() { require("./../../common.js"); wx.webpackJsonp.apply(null, arguments); };