import { navTo } from "./utils/util"

// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    wx.cloud.init({
        env: 'cloud1-2gn85aww35ca1ccf',
        traceUser: true
    })
  },
  /**
   * 获取当前登录信息
   * @param mustLogin 是否必须登录 为true时如果未登录则跳转到登录页
   */
  current(mustLogin = false) {
    const member = wx.getStorageSync(this.memberInfoKey)
    const logined = !!(member && member.mobile)
    if (mustLogin && !logined) {
        navTo('/pages/login/login')
    }
    return {
          logined,
          member
    }
  },
  memberInfoKey: '__member_info__',
  storeMember(member) {
      wx.setStorageSync(this.memberInfoKey, member)
  }
})