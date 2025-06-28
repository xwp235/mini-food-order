// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
// 云函数入口函数
/**
  {"phoneInfo": {"phoneNumber":"111"}}
 */
exports.main = async (event, context) => {
  const {OPENID} = cloud.getWXContext()
  
    // 1. 获取code
  const {code} = event
  // 2. 通过code调用接口api交换手机号
  const res = await cloud.openapi.phonenumber.getPhoneNumber({
      code
  })
  const {phoneNumber} = res.phoneInfo
  // 3. 更新会员手机号
  const updated = await db.collection('mxg_member')
        .where({
            _openid: OPENID
        })
        .update({
            data: {
                mobile: phoneNumber
            }
        })
  // 4. 查询最新的会员信息并返回
  const {data} = db.collection('mxg_member')
  .where({
      _openid: OPENID
  }).get()
  if (data && data.length) {
      return data[0]
  }
  return null
}