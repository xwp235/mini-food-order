// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数 查询指定位置的广告信息
exports.main = async (event, context) => {
  // 1 首页轮播 2 热门推荐 3 点单页
  const {position} = event
  return await db.collection('mxg_advert')
  .where({
      position,
      state: true
  })
  .orderBy('sort', 'asc')
  .get()
}