// components/navbar/index.js

import { navBack } from '@/utils/util'
import { toIndexPage } from '@/utils/page'

Component({

    options: {
        addGlobalClass: true
    },

    properties: {
        title: {
            type: String,
            value: ''
        }, 
        fixed: { // 是否固定到顶部
            type: Boolean,
            value: true,
        },
        fixedFullHeight: { //固定到顶部时，是否占满高度
            type: Boolean,
            value: true,
        },
        showSearch: { // 是否显示搜索区域
            type: Boolean,
            value: true
        },
        showSearchInput: { // 是否显示搜索输入框：true显示输入框 ，false搜索图标
            type: Boolean,
            value: true
        },
        showSearchBtn: { // 是否显示搜索按钮
            type: Boolean,
            value: false
        },
        background: { // 导航栏背景色
            type: String,
            value: '#f9f9f9'
        },
        disabled: { // 输入框禁用
            type: Boolean,
            value: true
        },
        keyword: String, // 输入框内容
        height: Number, // 导航栏高度，使用双向绑定 model:height 获取更新的值
    },

    data: {
        haveBack: true, // 是否有返回按钮 ， true是有，反之没有
        buttonTop: 0, // 胶囊到顶部的距离
        buttonRight: 0, // 胶囊所占宽度
        focus: false // 是否自动聚焦
    },

    // 定义组件生命函数
    lifetimes: {
        attached () {
            // 有大于可后退的1个页面，则显示后退按钮 
            const haveBack = getCurrentPages().length > 1

            // 右上角胶囊的数据
            const { top, width } = wx.getMenuButtonBoundingClientRect()

            this.setData({ 
                haveBack,
                buttonTop: top,
                buttonRight: width + 15
            })

            // 获取导航高度
            this.createSelectorQuery().select('#navbar').boundingClientRect((res) => {
                this.setData({ height: res.height })
            }).exec() // 不要少了exec
        }
    },

    methods: {
        // 点击后退或首页图标
        handleBack() {
            if (this.data.haveBack) { // 后退图标
                navBack()
            } else { // 首页图标
                toIndexPage()
            }
        },

        // 点击禁用时的搜索输入框或搜索图标
        handleDisabled(e) {
            if (this.properties.disabled) {
                // console.log('handleDisabled')
                this.triggerEvent('clickDisabled', e)
            }
        },

        // 输入框确认时
        confirmInput() {
            // console.log("confirmInput")
            const {keyword} = this.data
            this.triggerEvent('search', {keyword: keyword})
        },
        // 清空
        handleClear() {
            this.setData({
                focus: true
            })
            this.triggerEvent('clear')
        }

    }

})