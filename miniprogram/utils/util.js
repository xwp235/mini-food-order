/**
 * 判断是否为空
 * @param{String | Array} values
 */
export const isNull = (...values) => {
  return values.some(value => {
    if ([undefined, null, ''].includes(value) || value.toString().trim() == '') {
      return true
    }
    return false
  })
}

/**
 * 加载中 
 */
export const showLoading = (title = '', options) => {
  wx.showLoading({
    title,
    mask: false,
    ...options
  })
}

/** 隐藏加载中 */
export const hideLoading = () => {
  wx.hideLoading()
}

/** toast 提示 */
export const msg = (title = '', options) => {
  if(!title) return
  return wx.showToast({
    title,
    duration: 1500,
    mask: false,
    icon: 'none',
    ...options
  })
}

  
/**
 * 跳转页面
 * @param {String} e 目标页面地址url 或 event事件对象
 * @param {Object} options 参数 {logined: boolean} true是必须先登录
 */
export const navTo = (e, options = {logined: false}) => {
  // console.log('e', e)
  let url = e
  let logined = options?.logined
  if (typeof e === 'object') {
    const { dataset } = e.currentTarget // data-url="xxx" 
    url = dataset.url
    logined = logined || dataset.logined  // data-logined 取页面中传递的是否要求登录
  }
  if (!url) {
      return
  }
  if (logined) {
    const current = getApp().current() // 调用app.json中的current方法
    console.log(current)
    // 没有登录，进入登录页面
    if (!current?.logined) {
      navTo('/pages/login/login')
      return
    }
  }
  wx.navigateTo({
    url,
    ...options
  })
}

/**
 * 跳转到tabBar页面
 * @param {*} e 目标页面地址url 或 event事件对象
 * @param {*} data 传递的数据
 */
export const switchTab = (e, data) => {
  // 把数据保存至全局变量pageData中
  getApp().pageData = data

  let url = e
  if (typeof e === 'object') {
    const { dataset } = e.currentTarget
    url = dataset.url
  }
  
  return wx.switchTab({ url })
}

/**
 * 重定向页面，关闭当前页面
 * @param {String} url 目标页面地址
 */
export const redirectTo = async (url, options) =>  {
  if(!url) return
  wx.redirectTo({ 
    url,
    ...options
  })
}

// 后退, 默认后退一步 data后退带参数
export function	navBack(delta = 1, data){
  // 把数据保存至全局变量backData中
  getApp().backData = data
  wx.navigateBack({
    delta
  })
}

/**
 * 校验两个对象是否相等(不支持嵌套对象比较)
 * @param obj1 对象1
 * @param obj2 对象2
 * @returns true 相等
 */
export function equalsObj(obj1, obj2) {
  const _obj1 = JSON.stringify(obj1)
  const _obj2 = JSON.stringify({...obj1, ...obj2})
  return _obj1 === _obj2
}

/**
 * 计算总页数
 * @param total 总记录数
 * @param pageSize 每页显示多少条
 * @returns 返回计算后的总页数
 */
export function getTotalPage(total = 0, pageSize = 20) {
  // 总页数 = 总记录数 % 每页显示的条数 > 0 ?  总记录数 / 每页显示的条数 + 1 : 总记录数 / 每页显示的条数
  return total % pageSize > 0 ? Math.floor(total / pageSize) + 1 : Math.floor(total / pageSize)
}


/** 格式化日期 */
export const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

// 1 > 01,  9 > 01  10 > 10
export const formatNumber = (n) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const rpx2px = rpx => {
    const { windowWidth } = wx.getWindowInfo()
    // 手机屏幕宽度 * 小程序基准宽度 * 要转换的rpx值
    return windowWidth / 750 * rpx
}