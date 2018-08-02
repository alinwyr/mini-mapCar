
import { flow } from 'lodash';

const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	// 事件处理函数
	bindViewTap() {
		wx.navigateTo({
			url: '../test1/test1',
		});
	},
	onLoad() {

		// await delay();

		// const log = flow(() => {
		// 	console.log('is wechat mini program: ', __WECHAT__);
		// 	console.log('is alipay mini program: ', __ALIPAY__);
		// 	console.log('DEV: ', __DEV__);
		// });

		// log();

		// 查看是否授权
			wx.getSetting({
				success: (res)=>{
					if (res.authSetting['scope.userInfo']) {
						// 已经授权，可以直接调用 getUserInfo 获取头像昵称
						wx.getUserInfo({
							success: (res)=> {
								this.setData({ 
									userInfo: res.userInfo
								});
							}
						})
					}
				}
			}),
			app.request("aa",{
				name:11
			},res=>{
				console.log(111)
			},()=>{
				console.log(222)
			},()=>{
				console.log(333)
			})
	  },
	  bindGetUserInfo: (e)=> {
		console.log(e.detail.userInfo)
	  }
});
