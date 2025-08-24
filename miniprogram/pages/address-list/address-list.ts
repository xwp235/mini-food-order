import { hideLoading, msg, navBack, showLoading, navTo } from '@/utils/util'

// pages/address-list/address-list.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkedId: '',
    addressList: [],
    isOpen: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
        checkedId: options.addressId || ''
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.startPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
     this.loadList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  async loadList() {
      try {
        const { data: addressList } = await wx.cloud.database().collection('mxg_address').get()
        console.log('data', addressList)
        this.setData({
            addressList
        })
      } catch (e) {
          msg('查询数据失败', {
              icon: 'error'
          })
      } finally {
          wx.stopPullDownRefresh()
      }
  },
  async handleItemDelete(e) {
    const {item} = e.currentTarget.dataset
    const res = await wx.showModal({
        title: '您是否确认删除地址？',
        cancelText: '取消',
        confirmText: '确认',
        cancelColor: '#333',
        confirmColor: '#e40030'
    })
    if (res.cancel) {
        return
    }
    showLoading('删除中', {mask: true})
    try {
        const deleted = await wx.cloud.database().collection('mxg_address')
        .doc(item._id)
        .remove()
        msg('删除成功')
        wx.startPullDownRefresh()
    } catch (e) {
        console.log('删除失败', e)
       msg('删除失败', {
           icon: 'error'
       })
    } finally {
        hideLoading()
    }
  },
  onOpenSwipe(e) {
    this.setData({isOpen: true})
  },
  onCloseSwipe(e) {
    this.setData({isOpen: false})
    e.detail.instance.close()
  },
  onAddressSelected(e) {
      if (this.data.isOpen) {
          return
      }
      const {item} = e.currentTarget.dataset
      this.setData({
          checkedId: item._id
      })
  },
  toShoppingPage() {
      const {checkedId, addressList} = this.data
      const selectedAddress = addressList?.find(item => item._id === checkedId)
      console.log('selectedAddress', selectedAddress)
      if (!selectedAddress) {
          msg('请选择地址', {
              icon: 'error'
          })
          return
      }
      const eventChannel = this.getOpenerEventChannel()
      if (Object.keys(eventChannel).length) {
        eventChannel?.emit('updateAddress', selectedAddress)
      }
      navBack()
    },
    navTo
})