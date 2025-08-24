export function addAddress(data: any) {
  return wx.cloud.callFunction({
      name: 'add',
      data: {
          collectionName: 'mxg_address',
          data
      }
  })
}

export function getAddressById(id) {
    return wx.cloud.callFunction({
        name: 'getById',
        data: {
            collectionName: 'mxg_address',
            id
        }
    })
}

export function updateAddress(id, data) {
    return wx.cloud.callFunction({
        name: 'updateById',
        data: {
            collectionName: 'mxg_address',
            id,
            data
        }
    })
}
