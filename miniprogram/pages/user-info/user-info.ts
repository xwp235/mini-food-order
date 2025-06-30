// pages/user-info/user-info.ts

import {getMemberById} from '@/api/MemberApi'
import { hideLoading, isNull, msg, showLoading } from '@/utils/util'
import {uploadFile} from '@/api/FileApi'
Page({
  data: {
    member: null,  
    tmpAvatarUrl: '',  
    avatarUrl: '',
    nickname: '',
    sex: 1,
    birthday: null,
    mobile: '',
    error: {
        nickname: '',
        sex: '',
        birthday: '',
        mobile: ''
    }
  },
  onLoad(options) {
    this.loadMemberData(options.id)
  },
  async loadMemberData(id: string) {
    if (!id) {
        msg('未传递必须参数id')
        return
    }  
      try{
          showLoading()
      const {data: member} = await getMemberById(id)
      console.log('会员信息', member)
      const {mobile='',avatarUrl='',nickname = '',sex=1,birthday=''} = member
      this.setData({
          member,
          mobile,avatarUrl,nickname,sex,birthday
      })
      }catch(e) {
          msg('获取会员信息失败')
          console.log('获取会员信息失败', e)
      }finally{
          hideLoading()
      }
  },
  onAvatarChoosed(e) {
    const {avatarUrl} = e.detail
    this.setData({
        tmpAvatarUrl: avatarUrl
    })
  },
  onSexChange() {

  },
  async onFormSubmit(e) {
      const formData = e.detail.value
      const {nickname} = formData
      this.setData({
          nickname
      })
      let {sex, birthday, avatarUrl,tmpAvatarUrl} = this.data
      let error = {}
      console.log('nickname',nickname)
      if (isNull(nickname)) {
          error.nickname = '昵称不能为空'
      }
      if (isNull(sex)) {
        error.sex = '请选择性别'
      }
      if (tmpAvatarUrl) {
         const {fileID} = await uploadFile(tmpAvatarUrl, 'avatar')
         console.log('cloud fileID', fileID)
         this.setData({
             avatarUrl: fileID,
             tmpAvatarUrl: ''
         })
         avatarUrl = fileID
      }
      console.log(error)
      this.setData({error})
      // 校验未通过直接结束
      if (Object.keys(error).length) {
          return
      }
      console.log('---')
      
  },
  onLogout() {

  }
})