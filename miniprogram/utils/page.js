// 页面跳转
import { switchTab } from './util'

// 首页
export const toIndexPage = (data) => {
  return switchTab('/pages/index/index', data)
}

// 点单页
export const toShoppingPage = (data) => {
  return switchTab('/pages/shopping/shopping', data)
}

// 订单页
export const toOrderPage = (data) => {
  return switchTab('/pages/order-list/order-list', data)
}
