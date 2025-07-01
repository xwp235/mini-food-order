// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数 通过文档id更新指定集合
exports.main = async (event, context) => {
  const {collectionName, id, data} = event
  return await db.collection(collectionName)
  .doc(id)
  .update({
      data
  })
}