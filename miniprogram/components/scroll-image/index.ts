// components/scroll-image/index.ts
Component({
  options: {
        styleIsolation: "shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
        type: String,
        value: '热门推荐'
    },
    moreText: {
        type: String,
        value: '更多'
    },
    list: {
        type: Array,
        value: []
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
    onMoreChange() {
        // 触发父组件的right事件
        this.triggerEvent('click-more')
    }
  }
})