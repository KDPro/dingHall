// pages/setVeg/setVeg.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelplane:true,
    removeId:null,
    list: null
  },
  //新增菜品
  newVeg(){
    wx.navigateTo({
      url: '../newVeg/newVeg',
    })
  },
  //关闭弹出框
  remove(e) {
    this.setData({
      modelplane:true
    })
  },
  //删除打开弹窗
  removeBtn(e) {
    var id = e.target.dataset.id;
    var index = e.target.dataset.index;
    this.setData({
      removeId:id,
      index:index,
      modelplane:false
    });
  },
  // 确定删除
  boxValue(){
    var that = this;
    wx.request({
      url: app.globalData.appPath +"food/delete",
      header:{
        cookie: app.globalData.token
      },
      method:"GET",
      data:{
        id: that.data.removeId
      },
      success:function(res){
        if(res.data.code == 0) {
          var arr = that.data.list;
          var index = that.data.index;
          arr.splice(index,1);
          that.setData({
            list:arr
          })
          wx.showToast({
            title: '删除成功',
            duration:1500
          });
          setTimeout(that.setData({
            modelplane: true
          }),2000);
        }else {

        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    });
    wx.request({
      url: app.globalData.appPath + "food/s_bean",
      header:{
        cookie:app.globalData.token
      },
      method:"GET",
      data:{
        disable:1,
        pageSize:0
      },
      success:function(res){
        wx.hideLoading();
        var list = res.data.data.list;
        that.setData({
          list:list
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
    this.onLoad();
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