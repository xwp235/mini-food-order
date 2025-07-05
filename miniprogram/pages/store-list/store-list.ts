import { hideLoading, rpx2px, showLoading } from '@/utils/util'

// pages/store-list/store-list.ts

let mapContext

Page({
  data: {
    showMap: true,
    keyword: '',
    longitude: 0, 
    latitude: 0,
    scale: 13,
    markers: [],
    hasUserLocation: true,
    mapContext: null,
    activeTab: 'near',
    tabsPosTop: 100
  },
  async onLoad() {
    mapContext = wx.createMapContext('mapEl')
    this.queryTabsSelector()
    console.log(mapContext)
    await this.getUserLocation()
    console.log('store-list page onLoad')
    this.loadStoreList()
  },
  async openMapLocation() {
    try {  
        const res = await wx.chooseLocation({})
        const {longitude, latitude} = res
        this.setData({
            longitude,
            latitude
        })
    } catch(e) {
        console.log('获取地图位置失败', e)
    }
  },
  toggleShowMap() {
      this.setData({
          showMap: !this.data.showMap
      }, this.queryTabsSelector)
  },
  async loadStoreList() {
    const listComp = this.selectComponent('#'+this.data.activeTab)
    listComp?.loadStoreList()
  },
  onClickMarker(e) {
    const {markerId} = e.detail
    if (markerId !== 0 && this.data.markers[0].callout.display === 'ALWAYS') {
      this.setData({
          'markers[0].callout.display': 'BYCLICK'
      })
    }
  },
  async getUserLocation() {
      try {
          showLoading()
      const res = await wx.getLocation({
          type: 'gcj02'
      })
      console.log(res)
      const {longitude, latitude} = res
      this.setData({
          longitude,
          latitude
      })
    } catch(e) {
        console.error('获取用户当前位置失败', e)
        this.setData({
            hasUserLocation: false
        })
    } finally {
        hideLoading()
    }
  },
  openSettingCallback(e: WechatMiniprogram.CustomEvent<WechatMiniprogram.OpenSettingSuccessCallbackResult>) {
    const {authSetting} = e.detail
    const hasUserLocation = authSetting['scope.userLocation'] || false
    this.setData({
        hasUserLocation
    })
    if (hasUserLocation) {
        this.resetMapLocation()
    }
  },
  async resetMapLocation() {  
    await this.getUserLocation()
    this.loadStoreList()
  },
  onTabsChange(e) {
     const {name} = e.detail
     this.setData({
         activeTab: name
     })
     this.loadStoreList()
  },
  updateMapMarkers(e) {
    const {storeList} = e.detail
    const markers =storeList.map((item, index) => {
        return {
            id: index,
            longitude: item.location.coordinates[0],
            latitude: item.location.coordinates[1],
            iconPath: '/assets/images/location.png',
            width: '80rpx',
            height: '80rpx',
            callout: {
              display: index === 0 ? 'ALWAYS' : 'BYCLICK',
              borderRadius: 5,
              padding: 5,
              textAlign: 'center',
              bgColor: '#000000b3',
              color:'#fff',  
              content: item.name + '\n' + item.address
            }
        } 
    })
    console.log('markers', markers)
    this.setData({
        markers,
        scale: 13
    })
    if (mapContext) {
      setTimeout(() => {
        mapContext.moveToLocation({
            longitude: storeList[0]?.location.coordinates[0],
            latitude: storeList[0]?.location.coordinates[1]
        })
        console.log('+++')
      }, 300)
    }
  },
  queryTabsSelector() {
      wx.createSelectorQuery().select('#tabsEl').boundingClientRect(res=> {
        console.log('clientRect',res)
        this.setData({
            tabsPosTop: res.top + rpx2px(80)
        })
      }).exec()
  }
})