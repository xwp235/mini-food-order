import { hideLoading, msg, navBack, showLoading } from "@/utils/util"

// pages/login/login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agree: false,
    member: null,
    hasBindMobile: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.preLogin()
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
  async preLogin() {
      try {
        showLoading()
        const {result: member} = await wx.cloud.callFunction({
            name: 'preLogin'
        })
        // 判断是否绑定过手机号码
        const hasBindMobile = !!(member && member.mobile)
        console.log('hasBindMobile', hasBindMobile)
        console.log(member)
        this.setData({
            member,
            hasBindMobile
        })
      } catch (e) {
          console.error('预登录异常', e)
      } finally {
        hideLoading()
      }
  },
  checkAgreed() {
      if (!this.data.agree) {
          return msg('请阅读并勾选下方协议')
      }
  },
  onQuickLogin() {
    try {
        showLoading()
        const {hasBindMobile} = this.data
        // 未绑定手机号则直接结束
        if (!hasBindMobile) {
            return
        }
        // 已绑定手机号则保存会员信息到本地storage中
        this.onLoginSuccess()
    } catch (e) {
        msg('登录失败')
        console.log('快捷登录发生异常', e)
    } finally {
        hideLoading()
    }
  },
  // 授权手机号码登录
  async onGetPhoneNumber(e) {
      try {
        showLoading('登录中')
        const {code, cloudID, errMsg} = e.detail
        // 接收用户同意授权获取手机号码的授权码code字段，之后将code传递给微信服务器交换用户手机号码
        if (!code) {
            return
        }
        // 调用云函数
        const {result: member} = await wx.cloud.callFunction({
            name: 'getPhoneNumber',
            data: {
                code
            }
        })
        this.setData({
            member,
            bindMobile: true
        })
        this.onLoginSuccess()
     } catch (e) {
         msg('登录失败')
         console.log('授权手机号码登录失败', e)
     } finally {
         hideLoading()
     }
  },
  onLoginSuccess() {
    msg('登录成功', {
        icon: 'success'
    })
    getApp().storeMember(this.data.member)
    navBack()
  }
})