import {getMemberById} from '@/api/MemberApi'
import {getNearStoreList, updateCollectStoreIds} from '@/api/StoreApi'
import { toShoppingPage } from '@/utils/page'
import { hideLoading, msg, showLoading } from '@/utils/util'

// pages/store-list/list/index.ts
Component({
  options: {
    styleIsolation: "shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
      tabName: String,
      longitude: Number,
      latitude: Number,
      tabsPosTop: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: false,
    collectStoreIds: [],
    storeList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getCollectStoreIds() {
      const {member} = getApp().current()
      if (!member || !member._id) {
          return
      }
      const {data} = await getMemberById(member._id)
      this.setData({
          collectStoreIds: data.collectStoreIds || []
      })
      console.log(this.data.collectStoreIds)
    },
    async loadStoreList() {
        console.log(this.properties.tabsPosTop)
        try {
          this.setData({
              loading: true
          })
          // 1. 查询当前用户已收藏的门店ids
          await this.getCollectStoreIds()
          // 2. 根据当前用户位置，查询距离由近到远的门店列表数量
          const {
            tabName,
            longitude,
            latitude
          } = this.properties
          const {
            collectStoreIds
          } = this.data

          let storeList = []
          if (tabName === 'near') {
            const res = await getNearStoreList(longitude, latitude)
            const {list} = res
            storeList = list
          } else if (collectStoreIds && collectStoreIds.length) {
              // 查询收藏门店
              const res = await getNearStoreList(longitude, latitude,collectStoreIds)
            const {list} = res
            storeList = list
          }
          if (storeList.length) {
            for (const item of storeList) {
                const distance = Math.round(item.distance || 0)
                if (distance < 1000) {
                    item.distanceShow = distance + 'm'
                } else {
                    item.distanceShow = (distance / 1000).toFixed(2) + 'km'
                }
                item.collected = collectStoreIds.includes(item._id)
            }
            console.log('storeList', storeList)
            this.setData({
                storeList
            })
          }
          // 3. 更新地图上的标点信息
          this.triggerEvent('updateStoreList', {storeList})
        } catch(e) {
            msg('门店查询失败')
          console.error('查询门店列表异常',e)
        } finally {
            this.setData({
                loading: false
            })
        }
    },
    async onShopCollect(e) {
      try{
        showLoading()
        const {logined, member} = getApp().current(true)
        if (!logined) {
            return
        }

        const {item} = e.currentTarget.dataset
        console.log('store item tap', item)
        const collected = !item.collected
        await updateCollectStoreIds(member._id, item._id, collected)
        await this.loadStoreList()
        msg(collected?'收藏成功':'已取消收藏',{
            icon: 'success'
        })
      } catch (e) {
         console.log('收藏门店失败', e)
         msg('收藏门店失败',{
             icon: 'error'
         })
      } finally{
          hideLoading()
      }
    },
    handleLocation(e) {
        const {item} = e.currentTarget.dataset
        const {location, name, address} = item
        console.log('handleLocation', item)
        wx.openLocation({
            longitude: location.coordinates[0],
            latitude: location.coordinates[1],
            name,
            address
        })
    },
    handleCall(e) {
        const {item} = e.currentTarget.dataset
        console.log('handleCall', item)
        if (!item.contactPhone) {
           msg('该门店暂无联系电话')
           return
        }
        wx.makePhoneCall({
            phoneNumber: item.contactPhone
        })
    },
    toShoppingPage(e) {
        const {store} = e.currentTarget.dataset
        console.log('toShopping', store)
        toShoppingPage({
            store
        })
    }
  },
})