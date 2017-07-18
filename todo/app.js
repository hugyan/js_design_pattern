//app.js
// sdk的概念,wilddog可以解决数据存粗的问问题
// 这是提供的云服务器，todo对象文档集合 数据库mongodb
var wilddog = require('wilddog-weapp-all')

App({
  onLaunch: function() {
    // wilddog的配置
    var config = {
      // wilddog 哪个后端项目跟小程序对应
      syncURL:'https://yqftodo.wilddogio.com/'
    }
    wilddog.initializeApp(config)
    // 跟todo数据表对应起来
    this.ref = wilddog.sync().ref('todo')
    

    //调用API从本地缓存中获取数据
    // 相当于我们的数据表
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  // 应用级别的数据通信
  addItem: function(todo){
    // todo数据表对象
    // 数据对象化
    this.ref.push(todo)
  },
  getTodoRef:function(){
    return this.ref
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
