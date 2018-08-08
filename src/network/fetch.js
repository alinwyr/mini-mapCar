import _ from '../assets/plugin/lodash';
import toasts from '../utils/toasts';
import apiMapping from './apiMapping';
import errorCode from './errorCode';
import apiVersion from './apiVersion'

const NETWORK_FAIL_TIPS = '网络出错';

const showErrTips = (json) => {
    let errmsg = json.errmsg || errorCode[json.errcode];
    /**
     * 安卓环境下用showToast信息会显示不完整，故用showModal
    */
    toasts.showModal({
        content: errmsg || '无数据返回',
        showCancel: false,
        confirmText: '知道了'
    })
}

const request = (apiName, reqParams ,  options = {} ) => {
    if (
        typeof apiName !== 'string' ||
        !_.isObject(options)
    ) throw new Error('参数格式不对！')

    const data = Object.assign(apiVersion, reqParams);  // 请求数据
    let requestTask = null;          // 异步请求对象
    let promise = null;           // 请求的promise对象
    const isNeedAbort = options.isNeedAbort || false;
    const isNeedErrTips = options.isNeedErrTips === false ? false : true;

    promise = new Promise((resolve, reject) => {
        // 若不支持abort，则会返回undefined
        let targetApiUrl = GLOBAL_API_HOST + apiMapping[apiName];
        requestTask = wx.request({
            url: targetApiUrl,
            data,
            dataType: options.dataType || 'json',
            method: options.method || 'GET',
            header: options.header || { 'content-type': 'application/json' },
            success: res => {
                const json = res.data;
                console.log(res.data)
                if (json.errcode == 0) {
                    console.log(json.data)
                    resolve(json.data);
                } else {
                    isNeedErrTips && showErrTips(json);
                    reject({ type: 'success', ...json });
                }
            },
            fail: err => {
                isNeedErrTips && showErrTips({ errmsg: NETWORK_FAIL_TIPS });
                reject({ type: 'fail', errmsg: NETWORK_FAIL_TIPS });
            },
            complete: () => {}
        });
    });
    if (isNeedAbort) {
        return { promise, requestTask }
    }
    // console.log(promise)
    promise.then((res)=>{
        console.log(12312,res)
    })
    return promise;
}

export default request;
