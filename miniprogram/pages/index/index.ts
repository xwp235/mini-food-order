// index.ts
import {navTo, showLoading, hideLoading} from '@/utils/util'
import {toOrderPage, toShoppingPage} from '@/utils/page'
import {getAdvertList} from '@/api/AdvertApi'

Page({
  data: {
      bannerList: null,
      hotList: null,
      member: null,
      logined: false
  },
  async onLoad() {
      try {
        showLoading()
        this.loadAdvertList('1')
         await this.loadAdvertList('2')
      } catch(e) {
        
      } finally {
        hideLoading()
      }
  },
  navTo,
  toOrderPage,
  toShoppingPage(e: WechatMiniprogram.TouchEvent) {
    const {orderType} = e.currentTarget.dataset
    toShoppingPage({orderType})
  },
  async loadAdvertList(position: string) {
    const {data} = await getAdvertList(position)
    if (position === '1') {
        this.setData({
            bannerList: data
        })
    } else {
        this.setData({
            hotList: data
        })
    }
  }
})
