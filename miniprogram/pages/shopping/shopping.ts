import {getAdvertList} from '@/api/AdvertApi'
import { navTo } from '@/utils/util'

// pages/shopping.ts
Page({
    data: {
      navHeight: 0, // 导航栏的高度  
      takeType: 1,
      store: null,
      bannerList: [],
      showSearchInput: false,
      keyword: '',
      stickyOffsetTop: 0,
      address: null
    },
    onShow() {
        const pageData = getApp().pageData
        console.log('pageData', pageData)
        if (pageData) {
            const {orderType, store} = pageData
            console.log(store)
            if (orderType) {
                this.setData({
                    takeType: orderType
                })
            }
            if (store) {
                this.setData({
                    store
                })
            }
            getApp().pageData = {}
        }
    },
    onLoad() {
        this.loadAdvertList()
    },
    async loadAdvertList() {
        const {data} = await getAdvertList('3')
        this.setData({
            bannerList: data
        }, 
        this.queryStickyOffsetTop)
    },
    onNavInputClear() {
      this.setData({
          keyword: ''
      })
    },
    toSearchPage() {
        navTo('/pages/search/search')
    },
    onScrollStickied(e) {
      const {isFixed} = e.detail
      this.setData({
        showSearchInput: isFixed
      })
    },
    onTakeTypeChange(e) {
        const {takeType} = e.currentTarget.dataset
        this.setData({
            takeType
        })
    },
    navTo,
    toSelectAddress() {
        const addressId = this.data.address?._id || ''
        navTo('/pages/address-list/address-list?addressId='+ addressId, {
            events: {
                updateAddress: address => this.setData({address})
            }
        })
    },
    // 获取分类列表滚动吸顶时需要使用的距离顶部的距离
    queryStickyOffsetTop() {
        wx.createSelectorQuery().select('#takeOrderWrapperEl').boundingClientRect(rs => {
            this.setData({
                stickyOffsetTop: this.data.navHeight + rs.height
            })
        }).exec()
    }
})