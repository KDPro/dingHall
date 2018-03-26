//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: r => {
        var code = r.code;
        wx.getUserInfo({
          success: res => {
            console.log(res);
            this.login(code,res.encryptedData,res.iv);
            this.globalData.wxLogin = {
              encryptedData: res.encryptedData,
              iv:res.iv
            }
          },
          fail: res => {

            this.login();
          }
        });
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       console.log(res);
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           console.log(this.globalData.userInfo);
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   },
    //   fail:res=>{

    //   }
    // })
  },
  //调用后台 获取token；
  login: function (code,encryptedData,iv){
    var that = this;
    wx.request({
      url: this.globalData.appPath+'login',
      method: "GET",
      data: {
        encryptedData:encryptedData,
        iv:iv,
        code:code,
        // password:'123'
      },
      success: function (res) {
        if(res.data.code == 0) {
          if (res.data.token) {
            var token = "globalData.token";
            that.globalData.token = res.data.token;
          }
        }
        if(res.data.code == "50010") {
          wx.showModal({
            content: "食堂小助手需要获取您的用户信息",
            showCancel: false,
            confirmText: "重新拉取",
            success: function (res) {
              wx.openSetting({
                success: (res) => {
                  wx.login({
                    success: r => {
                      var code = r.code;

                      wx.getUserInfo({
                        success: res => {
                          that.login(code, res.encryptedData, res.iv);
                        },
                        fail: res => {

                          that.login();
                        }
                      });
                      // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    }
                  })
              
                }, fail: (res) => {
                  this.login();
                }
                
              })
            }
          })
        }
      },
      fail:function(res) {
        
      }
    })
  },
  
  globalData: {
    userInfo: null,
    appPath: "http://192.168.20.136:8083/",
    // appPath: "http://192.168.20.101:8083/",
    token:'',
    foodArr:{},
    total:0
  }
})