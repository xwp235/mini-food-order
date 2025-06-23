// index.ts
import {navTo} from '@/utils/util'
import {toOrderPage} from '@/utils/page'

Component({
  data: {
      bannerList: [1,2,3,4],
      member: null,
      logined: false
  },
  methods: {
      navTo,
      toOrderPage
  }
})
