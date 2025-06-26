// index.ts
import {navTo} from '@/utils/util'
import {toOrderPage, toShoppingPage} from '@/utils/page'

Page({
  data: {
      bannerList: [1,2,3,4],
      hotList: [1,2,3],
      member: null,
      logined: false
  },
  navTo,
  toOrderPage,
  toShoppingPage(e: WechatMiniprogram.TouchEvent) {
    const {orderType} = e.currentTarget.dataset
    toShoppingPage({orderType})
  }
})
