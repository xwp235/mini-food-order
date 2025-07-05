// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const {longitude, latitude, storeIds} = event
  const query = {}
  if (storeIds && storeIds.length) {
      query._id = _.in(storeIds)
  }
  const res = await db.collection('mxg_shop').aggregate()
  .geoNear({
      distanceField: 'distance',
      spherical: true,
      near: db.Geo.Point(longitude, latitude),
      key: 'location',
      includeLocs: 'location',
      query
  }).end()
  return res
}