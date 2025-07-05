export async function getNearStoreList(longitude, latitude,storeIds) {
    const {result} = await wx.cloud.callFunction({
        name: 'getNearStoreList',
        data: {
            longitude,
            latitude,
            storeIds
        }
    })
    return result
}

export async function updateCollectStoreIds(
    memberId,
    storeId,
    collected
) {
    return await wx.cloud.callFunction({
        name: 'updateCollectStoreIds',
        data:{
            memberId,
            storeId,
            collected
        }
    })
}