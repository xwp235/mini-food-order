// pages/user-info/user-info.ts

import {getMemberById, updateMemberById} from '@/api/MemberApi'
import { hideLoading, isNull, msg, navBack, showLoading } from '@/utils/util'
import {uploadFile} from '@/api/FileApi'
import { toIndexPage } from '@/utils/page'
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
      try {
        showLoading('保存中')  
        const formData = e.detail.value
        const {nickname} = formData
        this.setData({
            nickname
        })
        let {sex, birthday, avatarUrl,tmpAvatarUrl, member} = this.data
        let error = {}
        console.log('nickname',nickname)
        if (isNull(nickname)) {
            error.nickname = '昵称不能为空'
        }
        if (isNull(sex)) {
            error.sex = '请选择性别'
        }
        this.setData({error})
        // 校验未通过直接结束
        if (Object.keys(error).length) {
            return
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
        const data = {
        avatarUrl,
        nickname,
        birthday,
        sex
        }
        await updateMemberById(member!._id, data)
        // 更新本地登录用户信息
        getApp(). storeMember({...member, avatarUrl,nickname,birthday,sex})
        msg('保存成功')
        setTimeout(() => navBack(), 500)
    } catch (e) {
        console.log('保存失败', e)
    } finally {
        hideLoading()
    }
  },
  onLogout() {
    wx.removeStorageSync(getApp().memberInfoKey)
    toIndexPage()
  }
})