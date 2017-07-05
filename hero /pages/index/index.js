//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  gotoLegendTap:function(){
    console.log('点击了周免英雄');
    wx.navigateTo({
      url:'../free/free'
    })
  },
  gotoBattleTap:function(){
    console.log('点击了最近战绩');
    wx.navigateTo({
      url:'../legends/legends'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
