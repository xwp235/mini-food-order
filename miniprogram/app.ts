// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    wx.cloud.init({
        env: 'cloud1-2gn85aww35ca1ccf',
        traceUser: true
    })
  },
  current() {
      return {
          logined: false
      }
  }
})