// pages/member-code/member-code.ts
import {barcode, qrcode} from '@/utils/wxbarcode/index'

Page({
    data: {
        code: '',
        defaultLight: 0
    },
    onLoad() {
        const {member} = getApp().current(true)
        this.setData({
            code: member.cardNo
        })
        barcode('#barCode', this.data.code, 600, 200)
        qrcode('#qrCode', this.data.code, 500, 500)
    },
    onShow() {
        wx.getScreenBrightness({
            success: res=> {
                this.setData({
                    defaultLight: res.value
                })
                wx.setScreenBrightness({
                    value: 0.7
                })
            }
        })
    },
    onUnload() {
        wx.setScreenBrightness({
            value: this.data.defaultLight
        })
    }
})