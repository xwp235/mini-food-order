// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数 更新会员余额
exports.main = async (event, context) => {
  const {id, rechargeAmount} =event
  return await db.collection('mxg_member')
    .doc(id)
    .update({
        data: {
            balance: _.inc(rechargeAmount)
        }
    })
}