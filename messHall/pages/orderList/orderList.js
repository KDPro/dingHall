// pages/payMent/payMent.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payMentList: null
  },
  //跳转详情页面
  detail(e){
    console.log(e)
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: app.globalData.appPath + 'order/s_bean',
      method:"GET",
      header:{
        cookie:app.globalData.token
      },
      data:{
        pageSize:0
      },
      success:function(res){
        wx.hideLoading();
        var arr = res.data.data.list;
        console.log(arr);
        arr.forEach(function(e,index){
          if (arr[index].needTime == 1) {
            arr[index].needTime ="早餐"
          } else if (arr[index].needTime == 2) {
            arr[index].needTime = "午餐"
          } if (arr[index].needTime == 3) {
            arr[index].needTime = "晚餐"
          }
        })
        that.setData({
          payMentList:arr
        })
      }
    })
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