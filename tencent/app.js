//app.js
App({
    // 应用启动时 wifi 4g?
    onLaunch: function() {
        // 网络状态切换事件
        var unNetwork = this.globalData.unNetwork
        this.globalData.unNetwork =
            wx.getStorageSync('unNetwork');
        if (this.globalData.unNetwork === 'ok') {
            wx.onNetworkStatusChange(function(res) {
                if (res.networkType !== 'wifi') {
                    wx.showModal({
                        title: '温馨提示',
                        content: '检测到您现在使用的并不是wifi, 请留意您的流量，确认将不再提示，土豪请无视',
                        success: function(res) {
                            if (res.config) {
                                // 将当前的网络状态保存到本地
                                wx.setStorageSync('unNetwork', 'un');
                            } else if (res.cancel) {
                                console.log('用户点击取消');
                            }
                        }
                    })
                }
            })
        }

        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
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
    // 应用程序级别
    globalData: {
        userInfo: null,
        unNetwork: 'ok' /*网络连接状态 4g wifi  视频?*/
    }
})