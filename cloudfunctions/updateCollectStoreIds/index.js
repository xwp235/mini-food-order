// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const {memberId, storeId, collected} = event
  return await db.collection('mxg_member').doc(memberId)
  .update({
      data: {
          collectStoreIds: collected ? _.addToSet(storeId):_.pull(storeId)
      }
  })
}