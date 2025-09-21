export async function getCategoryList() {
    const {result} = await wx.cloud.callFunction({
         name: 'getCategoryList'
     })
     return result
 }