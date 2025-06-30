import { hideLoading, msg, showLoading } from '@/utils/util'
import { updateBalance} from '@/api/MemberApi'
import {pay} from '@/api/PayApi'

// pages/recharge/recharge.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chargeList: [
        {id: 1, payAmount: 1, receivedAmount: 1},
        {id: 2, payAmount: 10,receivedAmount: 10},
        {id: 3, payAmount: 50,receivedAmount: 55},
        {id: 4, payAmount: 100,receivedAmount: 110},
        {id: 5, payAmount: 500,receivedAmount: 550},
        {id: 6, payAmount: 1000, receivedAmount: 1100}
    ],
    loading: false,
    selectedChargeItem: null,
    balance: '0.00',
    member: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
        selectedChargeItem: this.data.chargeList[0]
    })
    this.loadMemberData()
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
  onChargeItemChange(e) {
    const {item} = e.currentTarget.dataset
    this.setData({
        selectedChargeItem: item
    })
  },
  // 查询会员余额
  loadMemberData() {
      try{
          showLoading()
    const {member, logined} = getApp().current(true)
    if (!logined) {
        return
    }
    console.log(member)
    // todo 调用getMemberById云函数获取会员余额
    let balance = member.balance || '1000'
    console.log(balance)
    balance = parseFloat(balance).toFixed(2)
    this.setData({
        balance,
        member
    })
} catch(e) {
  msg('查询账户余额失败')
  console.error('查询账户余额失败', e)
} finally {
    hideLoading()
}
  },
  async onCharge() {
      try {
        showLoading()
        this.setData({
            loading: true
        })
        const {member, selectedChargeItem} = this.data
        // 1. 校验是否已经选择充值项
        if (!selectedChargeItem || !selectedChargeItem.id) {
            msg('请选择充值金额', {
                icon: 'error'
            })
            return
        }
        // 2. 发起微信支付请求
        /// 云开发支付文档 https://developers.weixin.qq.com/miniprogram/dev/wxcloudservice/wxcloud/reference-sdk-api/open/pay/CloudPay.unifiedOrder.html
        const {payAmount, receivedAmount} = selectedChargeItem
        /// 通常微信支付文档 https://pay.weixin.qq.com/doc/v2/merchant/4011935214
        /// 微信支付模板 https://developers.weixin.qq.com/community/develop/article/doc/000882507142485af6821d3e266c13
        const orderNo = "R-" + Date.now()
        const payRes = await pay('账户充值', orderNo, payAmount, 'wxPayRechargeCallback')
        console.log('支付结果', payRes)
        // 3. 支付成功 更新会员信息
        await updateBalance(member._id, receivedAmount)
        // 4. 查询会员最新数据： 最新余额显示
        await this.loadMemberData()
        msg('充值成功', {
            icon: 'success'
        })
      } catch (e) {
        msg('充值失败', {
            icon: 'error'
        })  
        console.log('充值失败', e)
      } finally {
          hideLoading()
          this.setData({
              loading: false
          })
      }
  }
})