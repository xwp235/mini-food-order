// components/banner/index.ts
Component({
  options: {
      styleIsolation: "shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
     list: {
       type: Array,
       value: []    
     },
     height: {
         type: String,
         value: '500rpx'
     },
     dotsBottom: {
        type: String,
        value: '18rpx'
     }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})