webpackJsonp([1],{

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(71);


/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(13);

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = __webpack_require__(57);

var _extends3 = _interopRequireDefault(_extends2);

var _isEmpty2 = __webpack_require__(99);

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _fetch = __webpack_require__(125);

var _fetch2 = _interopRequireDefault(_fetch);

var _navigator = __webpack_require__(152);

var _navigator2 = _interopRequireDefault(_navigator);

var _event = __webpack_require__(156);

var _event2 = _interopRequireDefault(_event);

var _system = __webpack_require__(157);

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

App({
	onLaunch: function onLaunch() {
		// 调用API从本地缓存中获取数据
		var logs = wx.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		wx.setStorageSync('logs', logs);
	},


	globalData: {
		code: null,
		unionId: null, //全局的unionId
		openId: null, //  全局的openid
		userInfo: null, //  用户信息
		// 6.5.6以下会触发page的onShow两次，故更低的版本均不可使用小程序
		isHighVersionThan656: _system2.default.getWXVersion().number >= 656,
		isHighSDKVersion170: _system2.default.getSDKVersion().number >= 170
	},
	// 自定义 request
	request: function request(apiName, reqParams) {
		for (var _len = arguments.length, option = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			option[_key - 2] = arguments[_key];
		}

		return _fetch2.default.apply(undefined, [apiName, reqParams].concat(option));
	},


	// 获取用户信息 
	getUserInfo: function getUserInfo(cb) {

		var _this = this;
		var globalData = this.globalData;

		var isNeedCallback = typeof cb === 'function';

		if (!(0, _isEmpty3.default)(globalData.encryptedInfo)) {
			isNeedCallback && cb(globalData.encryptedInfo);
		} else {
			// 调用登录接口
			wx.login({
				success: function success(res) {
					var code = res.code;
					// 调用用户信息接口，获取密文。

					wx.getUserInfo({
						complete: function complete(data) {
							var encryptedData = data.encryptedData || '';
							var iv = data.iv || '';
							var params = {
								jsCode: code,
								encryptedData: encryptedData,
								iv: iv
							};

							var APINAME = 'getUserInof';

							this.request(APINAME, params, function (resData) {
								if ((0, _isEmpty3.default)(resData)) {
									globalData.encryptedInfo = null;
								} else {
									globalData.encryptedInfo = (0, _extends3.default)({}, resData, { code: code });
								}
								isNeedCallback && cb(globalData.encryptedInfo);
							});
						}
					});
				}
			});
		}
	},

	// 授权
	getOpenId: function getOpenId() {
		var _this2 = this;

		var _this = this;
		return new _promise2.default(function (resolve, reject) {
			if (!_this2.globalData.openId) {
				wx.login({
					timeout: function timeout() {
						this.getOpenId();
					},
					success: function success(res) {
						var code = res.code;

						_this.globalData.code = code;

						_this.request('getOpenId', { code: code }, function (res) {
							if (res) {
								var openId = _this.globalData.openId = res.info.openId; // 修改全局的openId
								var unionId = _this.globalData.unionId = res.info.unionId && res.info.unionId || null;
								resolve({ unionId: unionId, openId: openId });
							}
						});
					}
				});
			} else {
				resolve({ openId: _this.globalData.openId, unionId: _this.globalData.openId });
			}
		});
	},

	// 保存用户信息
	saveUserInfo: function saveUserInfo(data) {
		var _data$userInfo = data.userInfo,
		    nickName = _data$userInfo.nickName,
		    avatarUrl = _data$userInfo.avatarUrl;


		this.request('updateUserInfo', {
			openid: this.globalData.openId,
			nickName: nickName,
			avatarUrl: avatarUrl
		}, function (_) {});
	},

	// 安装插件
	installPlugins: function installPlugins() {
		/** 安装跳转管理器
   *  可通过app.navigator.navigateTo(options)进行路由跳转
  */
		new _navigator2.default({ app: this, propertyName: 'navigator' }).install();
		this.navigateTo = this.navigator.navigateTo;

		/**
   * 安装事件管理器，用于页面间通信
   * 将会在this对象上添加四个属性：on/emit/remove/_events
  */
		new _event2.default().install(this);
	}
});

/***/ })

},[70]); function webpackJsonp() { require("./common.js"); wx.webpackJsonp.apply(null, arguments); };