// 查询指定位置的广告信息
// 1 首页轮播 2 热门推荐 3 点单页

export async function getAdvertList(position: string) {
   const {result} = await wx.cloud.callFunction({
        name: 'getAdvertList',
        data: {
            position
        }
    })
    return result
}