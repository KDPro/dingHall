//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    title:"大学食堂",
    icon: "",
    context: ""
  },
  onLoad:function(){
    this.dingInt();
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.onLoad();
  },
  dingInt:function(){
    var that = this;
    wx.request({
      url: app.globalData.appPath + "sketch/s_bean",
      method:"GET",
      header:{
        cookie: app.globalData.token
      },
      data: {
        pageNum:1,
        pageSize:1
      },
      success:function(res){
        console.log(res);
        app.globalData.intId = res.data.data.list[0].id;
        var d = res.data.data.list[0];
        that.setData({
          title:d.title,
          icon: d.lFiles[0].url,
          context: d.context
        })
        var wxParse = require('../../wxParse/wxParse.js');
        wxParse.wxParse('context', 'html', that.data.context, that);
      }
    })
  }
})
