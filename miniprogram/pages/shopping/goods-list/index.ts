import {getCategoryList} from '@/api/GoodsApi'

Component({
  options: {
    styleIsolation: "shared"
  },
  properties: {
    stickyTop: Number
  },
  data: {
    categoryList: [],
    activeCategoryId: -1
  },
  lifetimes: {
    attached() {
      this.loadCategoryList()
    }
  },
  methods: {
    encode(str) {
      return encodeURIComponent(str).replaceAll('%','')
    },
    async loadCategoryList() {
      let { list: categoryList } = await getCategoryList()
      let activeCategoryId = -1
      if (categoryList && categoryList.length) {
        categoryList = categoryList.map(item => ({
          categoryId: this.encode(item._id),
          categoryName: item._id
        }))
        activeCategoryId = categoryList[0].categoryId
      }
      this.setData({
        categoryList,
        activeCategoryId
      })
    },
    handleCategoryClick(e) {
      const {item} = e.currentTarget.dataset
      this.setData({
        activeCategoryId: item.categoryId
      })
    }
  }
})