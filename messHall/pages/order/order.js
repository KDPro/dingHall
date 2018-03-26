// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  order:function(){
    wx.showLoading({
      title: '下单中...',
    })
    var arr = [];
    for (var key in app.globalData.foodArr) {
      arr.push(app.globalData.foodArr[key]);
    }
    wx.request({
      url: app.globalData.appPath + "order/save",
      header: {
        cookie: app.globalData.token
      },
      method: "POST",
      data: {
        tOrder: app.globalData.boxVal,
        lOrderdetails: arr
      },
      success: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '下单成功',
          duration:1500,
          complete:function(){
            setTimeout(function () {
              wx.navigateBack({ changed: true }); 
            }, 2000)
         
          }
        })
      },
      fail: function (res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name:app.globalData.boxVal.name,
      phone: app.globalData.boxVal.telephone,
      time: app.globalData.boxVal.timeName,
      pkg: app.globalData.boxVal.isPack==1?"是":"否",
      orderList: app.globalData.foodArr
    });
    console.log(this.data.orderList);
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