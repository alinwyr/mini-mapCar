webpackJsonp([2],{

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(13);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var delay = function delay() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return new _promise2.default(function (resolve) {
        return setTimeout(resolve, t);
    });
};

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

        app.request("aa", {
            name: 11
        }).then(function (res) {
            console.log(2);
            console.log(res);
            _this.setData({
                motto: res.motto
            });
        });
    }
});

/***/ })

},[161]); function webpackJsonp() { require("./../../common.js"); wx.webpackJsonp.apply(null, arguments); };