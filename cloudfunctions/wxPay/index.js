// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数 发起支付生成预支付订单
/**
 * 
 * https://developers.weixin.qq.com/miniprogram/dev/wxcloudservice/wxcloud/reference-sdk-api/open/pay/CloudPay.unifiedOrder.html
 */
exports.main = async (event, context) => {
    const {ENV: envId} = cloud.getWXContext()
    const {
        body,
        outTradeNo,
        totalFee,
        functionName
    } = event
    let payment = null
    try {
    const res = await cloud.cloudPay.unifiedOrder({
        body, // 商品描述
        outTradeNo, // 商户订单号
        spbillCreateIp : "127.0.0.1", // 终端 IP
        subMchId: "1900009231", // 商户号
        totalFee, // 总金额 微信的金额单位是分
        envId, // 云函数环境名称
        functionName // 支付结果通知回调云函数名
      })
      console.log('预支付订单生成成功', res)
      payment = res.payment
    } catch(e) {
        console.log('预生成支付订单失败', e)
    }
    if (payment) {
        try {
            return await wx.requestPayment(payment)
        } catch (e) {
            console.log('发起支付失败', e)
        }
    }
}