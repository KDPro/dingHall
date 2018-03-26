// pages/book/book.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "menuId": null,
    "leftMenu": [
      {
        "id": 1,
        "name": "全部菜品"
      }
    ],
    "rightVegetable": [],
    "shopCar":{},
    "modelplane":false,
    "select":false,
    "selectValue":'早餐',
    "selectId":1,
    "radio":false,
    "formName":'',
    "formPhone":'',
    "total":0
  },
  /**
   * 打开选择框
   */
  modelShow(){
    console.log(JSON.stringify(this.data.shopCar))
    if (JSON.stringify(this.data.shopCar) == "{}") {
      wx.showModal({
        content: '请选择菜品',
      })
      return false;
    }
    this.setData({
      modelplane: !this.data.modelplane
    })
  },
  /**
   * 选择时间
   */
  select() {
    this.setData({
      select:!this.data.select
    });
  },
  selectThis(e){
    var value = e.target.dataset.value;
    var id = e.target.dataset.id;
    this.setData({
      "selectValue":value,
      "selectId":id
    });
  },
  /**
   * 单选按钮
   */
  radioFun(e){
    var radio = e.target.dataset.radio;
    console.log(radio);
    this.setData({
      "radio":!this.data.radio
    })
  },
  /**
   * 姓名的获取
   */
  fromName(e){
    var value = e.detail.value;
    this.setData({
      formName:value
    });
  },
  /**
   * 联系方式的获取
   */
  formPhone(e) {
    var value = e.detail.value;
    this.setData({
      formPhone: value
    });
  },
  /**
   * 点击确定保存预定值
   */
  boxValue(){
    var that = this;
    var time = this.data.selectValue;
    var id = this.data.selectId;
    var pkg = this.data.radio?1:0;
    var name = this.data.formName;
    var phone = this.data.formPhone;
    if (time != '' && name != '' && phone != '') {
      this.setData({
        modelplane:!this.data.modelplane
      }); 
      app.globalData.boxVal = {
        needTime: id,
        isPack: pkg,
        name: name,
        telephone: phone,
        timeName:time,
        num:this.data.total
      }
      wx.navigateTo({
        url: '../order/order'
      })
    }else {
      wx.showModal({
        content: '请输入完整信息',  
      })
      return false;
    }
  },
  /**
     * 点击当前，菜品列表 获取 菜
     * @param index
     */
  changeAct(e) {
    var index = e.target.dataset.index;
    this.setData({
      menuId:index
    });
    // this.$g({
    //   point: this,
    //   url: '/FoodShelves/selectFoodShelves',
    //   params: {
    //     className: this.menuId,
    //     storeId: this.$common.getAll().storeId
    //   },
    //   callback: (res) => {
    //     this.$set(this, "rightVegetable", res.data);
        // this.reRightVege(res.data);
    //     this.$nextTick(() => {
    //       if (!this.Scroll) {
    //         this.Scroll = new BScroll(this.$refs.vegeBox, {
    //           click: true
    //         });
    //       } else {
    //         this.Scroll.refresh();
    //       }
    //     });
    //   }
    // });
  },
  /**
       * 当前菜品加数量
       * @param index
       */
  add(e) {
    var index = e.target.dataset.index;
    var arr = this.data.rightVegetable;
    var count = arr[index].count;
    if (count) {
      arr[index].count = count + 1;
    } else {
      arr[index].count = 1;
    }
    this.setData({
      rightVegetable: arr
    })
    this.storeM(index);
  },
  /**
     * 当前菜品减数量
     * @param index
     */
  sub(e) {
    var index = e.target.dataset.index;
    var arr = this.data.rightVegetable;
    var count = arr[index].count;
    arr[index].count = count - 1;
    this.setData({
      rightVegetable: arr
    })
    this.storeM(index);
  },
  /**
     * 将商品id，count，price存在vuex里面，为了遍历方便  存储结构为json
     * @param index
     */
  storeM(index) {
    var arr = this.data.rightVegetable;
    var fAP = this.accMul(arr[index].count, arr[index].price);
    this.increment({
      foodId: arr[index].id,
      count: arr[index].count,
      foodPrice: arr[index].price,
      foodAllPrice: fAP,
      foodName: arr[index].name
    });
    this.remove();
    this.accountTotal();
    app.globalData.foodArr = this.data.shopCar;
    app.globalData.total = this.data.total;
  },
  increment(payLoad) {
    var index = payLoad.foodId;
    var cart = this.data.shopCar;
    cart[index] = payLoad;
    this.setData({
      shopCar:cart
    })
    
  },
  remove() {
    var state = this.data.shopCar;
    for (var key in state) {
      if (state[key].count == 0) {
        delete state[key];
        this.setData({
          shopCar: state
        })
        
      }
    }
  },
  accountTotal() {
    var cart = this.data.shopCar;
    var allT = 0;
    for (var key in cart) {
      var singleP = this.accMul(cart[key].foodPrice, cart[key].count);
      allT = this.accAdd(allT, singleP);
    }
    this.setData({
      total:allT
    });
  },
  /**
   * 解决加减乘除bug
   */
  /**除法函数，用来得到精确的除法结果
   说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
   调用：accDiv(arg1,arg2)
   返回值：arg1除以arg2的精确结果**/
  accDiv: function (arg1, arg2) {
    var t1 = 0,
      t2 = 0,
      r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
      t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return this.accMul((r1 / r2), Math.pow('', t2 - t1));
  },

  /**乘法终极解决方法**/
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


  /**加法运算终极解决办法**/
  accAdd: function (arg1, arg2) {
    var r1, r2, m, c;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      var cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", "")) * cm;
      }
      else {
        arg1 = Number(arg1.toString().replace(".", "")) * cm;
        arg2 = Number(arg2.toString().replace(".", ""));
      }
    }
    else {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", ""));
    }
    return this.accDiv((arg1 + arg2), m);
  },

  /**减法终极解决方法**/
  accSub: function (arg1, arg2) {
    return this.accAdd(arg1, -arg2);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      total:0,
      shopCar:{}
    })
    var that = this;
    wx:wx.request({
      url: app.globalData.appPath +'food/s_bean',
      data:{
        disable:1,
        pageSize:0
      },
      header: {
        cookie:app.globalData.token
      },
      method: "GET",
      success: function(res) {
        that.setData({
          rightVegetable:res.data.data.list
        })
      },
      fail: function(res) {},
      complete: function(res) {},
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