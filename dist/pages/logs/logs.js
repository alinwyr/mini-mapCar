webpackJsonp([3],{

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(170);

Page({
	data: {
		logs: []
	},
	onLoad: function onLoad() {
		this.setData({
			logs: (wx.getStorageSync('logs') || []).map(function (log) {
				return (0, _util.formatTime)(new Date(log));
			})
		});
	}
});

/***/ })

},[169]); function webpackJsonp() { require("./../../common.js"); wx.webpackJsonp.apply(null, arguments); };