// pages/shopping.ts
Page({
    data: {
      orderType: 1
    },
    onShow() {
        const pageData = getApp().pageData
        if (pageData) {
            const {orderType} = pageData
            if (orderType) {
                this.setData({
                    orderType
                })
            }
            getApp().pageData = {}
        }
    }
})