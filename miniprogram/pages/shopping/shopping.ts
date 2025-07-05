// pages/shopping.ts
Page({
    data: {
      orderType: 1,
      store: null
    },
    onShow() {
        const pageData = getApp().pageData
        console.log('pageData', pageData)
        if (pageData) {
            const {orderType, store} = pageData
            console.log(store)
            if (orderType) {
                this.setData({
                    orderType
                })
            }
            if (store) {
                this.setData({
                    store
                })
            }
            getApp().pageData = {}
        }
    }
})