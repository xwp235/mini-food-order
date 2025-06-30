export async function updateBalance(id: string, rechargeAmount: number) {
  return await wx.cloud.callFunction({
      name: 'updateMemberBalance',
      data: {
        id,
        rechargeAmount
      }
  })
}