// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const {returnCode} = event
  if (returnCode !== 'SUCCESS') {
      // 支付失败返回errcode非0还会继续触发微信后台的回调
      return {
          errcode: -1, errmsg: 'FAIL'
      }
  }
  // 支付成功一定要返回下面的对象，这样微信才不会再次回调此云函数
  return {
    errorcode: 0,
    errmsg: 'SUCCESS'
  }
}