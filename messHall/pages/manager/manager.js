// pages/manager/manager.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "modelplane":false,
    "fromPwd":''
  },
  fromPwd(e){
    var value = e.detail.value;
    this.setData({
      fromPwd: value
    });
  },
  boxValue(){
    var that = this;
    var pwd = this.data.fromPwd;
    if(pwd=="") {
      wx.showModal({
        content:"请输入密码"
      })
    }else {
      var json = app.globalData.wxLogin;
      wx.login({
        success: r => {
          json.code = r.code;
          json.password = pwd;
          wx.request({
            url: app.globalData.appPath + "login",
            method: "GET",
            data: json,
            success: function (res) {
              console.log(res);
              if (res.data.code == 0) {
                app.globalData.token = res.data.token;
                that.setData({
                  modelplane: !that.data.modelplane
                });
              }else {
                wx.showModal({
                  content: res.data.msg,
                })
              }
            }
          })

        }
      });
      
      

      // wx.navigateTo({
      //   url: 'orderList',
      // })
    }
  },
  orderList(){
    wx.navigateTo({
      url: '../orderList/orderList',
    })
  },
  dinagHall(){
    wx.navigateTo({
      url: '../dinagHall/dinagHall',
    })
  },
  setVeg(){
    wx.navigateTo({
      url: '../setVeg/setVeg',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})