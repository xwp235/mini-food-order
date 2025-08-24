// pages/address-edit/address-edit.ts
import {hideLoading, isNull, msg, navBack, showLoading} from '@/utils/util'
import {addAddress, getAddressById, updateAddress} from '@/api/AddressApi'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '', // 姓名
    sex: 0, // 性别
    mobile: '', // 手机号
    locationName: '', // 地址
    streetNumber: '', // 门牌号,
    address: '', // 完整地址
    longitude: 0,
    latitude: 0,
    error: {
        name: '',
        sex: '',
        mobile: '',
        locationName: '',
        streetNumber: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {id = ''} = options
    wx.setNavigationBarTitle({
        title: id ? '修改地址':'新增地址'
    })
    this.loadData(id)
  },
  async loadData(id) {
    if (!id) {
        return
    }
    try {
      showLoading()
      const {result} = await getAddressById(id)
      const {
         name,
         sex,
         mobile,
         locationName,
         longitude,
         latitude,
         streetNumber
      } = result.data
      console.log(longitude, latitude, name)

        this.setData({
            id,
            name,
            sex,
            mobile,
            locationName,
            longitude,
            latitude,
            streetNumber
          })
    } catch (error) {
      console.error('获取地址详情失败', error)
      msg('地址查询失败', {
          icon: 'error'
      })
    } finally {
      hideLoading()
    }
  },
  async chooseLocation() {
    const { name, address, latitude, longitude } = await wx.chooseLocation({})
        this.setData({
            locationName: name,
            address,
            longitude,
            latitude
        })
  },
  handleConfirm() {
      const {name, sex, mobile, locationName, longitude, latitude, streetNumber} = this.data
      let error = {}
      if (isNull(name)) {
          error.name = '联系人姓名不能为空'
      }
      if (sex === 0) {
          error.sex = '性别为必选项'
      }
      if (isNull(mobile)) {
        error.mobile = '手机号不能为空'
      }
      if (isNull(locationName, longitude, latitude)) {
        error.locationName ='地址不能为空'
      }
      if (isNull(streetNumber)) {
          error.streetNumber = '门牌号不能为空'
      }
      this.setData({ error })
      if (Object.keys(error).length) {
          return
      }
      this.addOrUpdate()
  },
  async addOrUpdate() {
    try {
        showLoading('提交中')
        const {id, name, sex, mobile, locationName, address, longitude, latitude, streetNumber} = this.data 
        const data = {
            name, sex, mobile, locationName, address, longitude, latitude, streetNumber
        }
        let res
        if (!id) {
          res = await addAddress(data)
        } else {
          res = await updateAddress(id, data)
        }
        console.log('保存地址成功', res)
        msg('保存成功', {
            icon: 'success'
        })
        navBack()
    } catch (error) {
        console.error('保存地址失败', error)
        msg('保存失败', {
            icon: 'error'
        })
    } finally {
        hideLoading()
    }
  }
})