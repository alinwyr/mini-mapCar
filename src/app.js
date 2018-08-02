import _ from 'lodash';
import request from './network/fetch';
import Navigator from './utils/navigator';
import Event from './utils/event';
import sys from './utils/system';

App({
	onLaunch() {
		// 调用API从本地缓存中获取数据
		const logs = wx.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		wx.setStorageSync('logs', logs);
	},
	
	globalData: {
		code:null,
		unionId:null,   //全局的unionId
        openId:null,    //  全局的openid
		userInfo:null,    //  用户信息
		// 6.5.6以下会触发page的onShow两次，故更低的版本均不可使用小程序
		isHighVersionThan656: sys.getWXVersion().number >= 656,
		isHighSDKVersion170: sys.getSDKVersion().number >= 170,
	},
	// 自定义 request
    request(apiName, reqParams, ...option) {
        request(apiName, reqParams, ...option);
	},

	// 获取用户信息 ，参数tempUser只给判断是否临时车主用
	getUserInfo(cb, tempUser) {

		const _this = this;
		const { globalData } = this;
		const isNeedCallback = typeof cb === 'function';

		if (!_.isEmpty(globalData.encryptedInfo)) {
			isNeedCallback && cb(globalData.encryptedInfo);
		} else {
			// 调用登录接口
			wx.login({
				success(res) {
					const { code } = res;
					// 调用用户信息接口，获取密文。
					wx.getUserInfo({
						complete(data) {
							let encryptedData = data.encryptedData || '';
							let iv = data.iv || '';
							const params = {
								jsCode: code,
								encryptedData,
								iv,
							}

							let APINAME = 'getUserInof'

							this.request(APINAME, params, resData => {
								if (_.isEmpty(resData)) {
									globalData.encryptedInfo = null;
								} else {
									globalData.encryptedInfo = { ...resData, code };
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
	getOpenId(){
        let _this = this;
        return new Promise((resolve, reject) => {
            if (!this.globalData.openId) {
                wx.login({
                    timeout() {
                        this.getOpenId();
                    },
                    success(res) {
                        const {
                            code
                        } = res;
                        _this.globalData.code = code;

                        _this.request('getOpenId',{code:code},(res)=>{
                            if(res){
                                let openId = _this.globalData.openId = res.info.openId// 修改全局的openId
                                let unionId = _this.globalData.unionId = res.info.unionId && res.info.unionId || null
                                resolve({ unionId ,openId})
                            }
                        })
                    }
                });
            } else {
                resolve({ openId:_this.globalData.openId ,unionId:_this.globalData.openId} )
            }
        })
	},
    // 保存用户信息
    saveUserInfo(data){
        let {
            nickName,
            avatarUrl
        } = data.userInfo

        this.request('updateUserInfo', {
            openid:this.globalData.openId,
            nickName: nickName,
            avatarUrl:avatarUrl
        }, _ => {})
    },
	// 安装插件
    installPlugins() {
        /** 安装跳转管理器
         *  可通过app.navigator.navigateTo(options)进行路由跳转
        */
        new Navigator({ app: this, propertyName: 'navigator' }).install();
        this.navigateTo = this.navigator.navigateTo;

        /**
         * 安装事件管理器，用于页面间通信
         * 将会在this对象上添加四个属性：on/emit/remove/_events
        */
        new Event().install(this);
    }
});
