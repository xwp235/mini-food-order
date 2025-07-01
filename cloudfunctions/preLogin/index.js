// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const {OPENID} = cloud.getWXContext()
  // 1. 通过_openid查询会员信息
  const {data} = await db.collection('mxg_member')
  .where({
      _openid: OPENID
  })
  .get()
  // 2. 存在 查询返回会员信息
  if (data && data.length) {
      return data[0]
  }
  // 3. 不存在 注册成为新会员
  const newMember = {
      _openid: OPENID,
      cardNo: Date.now(),
      isAdmin: false,
      _createTime: Date.now()
  }
  const rs = await db.collection('mxg_member')
  .add({
      data: newMember
  })
  return newMember
}