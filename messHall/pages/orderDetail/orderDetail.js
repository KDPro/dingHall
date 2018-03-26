// pages/orderDetail/orderDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    name:"",
    phone:"",
    time:"",
    pkg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    console.log(options);
    var id = options.id;
    wx.request({
      url: app.globalData.appPath +"order/s_xq" ,
      header:{
        cookie: app.globalData.token
      },
      method:"GET",
      data:{
        id:id
      },
      success:function(res){
        wx.hideLoading();
        var list = res.data.data.list[0];
        if (list.needTime == 1) {
          list.needTime = "早餐"
        } else if (list.needTime == 2) {
          list.needTime = "午餐"
        } if (list.needTime == 3) {
          list.needTime = "晚餐"
        }
        var detail = list.lOrderdetail;
        detail.forEach(function(e,index){
          detail[index].price = that.accMul(detail[index].count, detail[index].price);
        })
        that.setData({
          name: list.name,
          phone: list.telephone,
          time:list.needTime,
          pkg: list.isPack==0?"否":"是",
          num:list.num,
          list: detail
        })
        console.log(that.data);
      }
    })
  },
  accMul: function (arg1, arg2) {
    var m = 0,
      s1 = arg1.toString() || 0,
      s2 = arg2.toString() || 0;
    try {
      m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
      m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
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