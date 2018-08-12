// 获取应用实例
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  bindViewTap () {
    wx.navigateTo({
      url: '../user/user'
    })
  },
  onLoad () {

  }
})
