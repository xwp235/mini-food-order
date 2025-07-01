export async function updateBalance(id: string, rechargeAmount: number) {
  return await wx.cloud.callFunction({
      name: 'updateMemberBalance',
      data: {
        id,
        rechargeAmount
      }
  })
}

export async function getMemberById(id: string) {
   const {result} = await wx.cloud.callFunction({
        name: 'getById',
        data: {
            id,
            collectionName: 'mxg_member'
        }
    })
    return result
}

export async function updateMemberById(id: string, data: any) {
    const {result} = await wx.cloud.callFunction({
        name: 'updateById',
        data: {
            id,
            collectionName: 'mxg_member',
            data
        }
    })
    return result
}