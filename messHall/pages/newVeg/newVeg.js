// pages/newVeg/newVeg.js
const app = getApp();
Page({

  data: {
    title: '',
    introduce: '',
    imgs: ""
  },
  title(e) {
    var value = e.detail.value;
    this.setData({
      title: value
    });
  },
  introduce(e) {
    var value = e.detail.value;
    this.setData({
      introduce: value
    });
  },

  // 上传图片
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          imgs: tempFilePaths
        })

        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 1) {
            that.setData({
              imgs: imgs
            });
            if (that.data.imgs.length >= 1) {
              that.setData({
                lenMore: 1
              });
            }
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        if (that.data.imgs.length >= 1) {
          that.setData({
            lenMore: 1
          });
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });

      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
    this.setData({
      lenMore: 0
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  toUpload: function (e) {
    var that = this;
    if (this.data.title == "" || this.data.introduce == "") {
      wx.showModal({
        content: '请输入完整内容',
      })
      return false;
    }
    wx.uploadFile({
      url: app.globalData.appPath + 'food/save',
      method: "POST",
      filePath: that.data.imgs[0],
      name: 'file',
      header: {
        'content-type': 'multipart/form-data',
        "cookie": app.globalData.token
      },
      formData: {
          "price": parseFloat(that.data.introduce),
          'name': that.data.title,
      },
      success: function (res) {
        wx.navigateBack({ changed: true })
        var data = res.data
        console.log(res);
        //do something
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})