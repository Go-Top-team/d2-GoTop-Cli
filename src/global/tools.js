// 工具方法
import * as lib from '@/libs/info'

var tools = {}
// 还可以在这个文件里面添加多个函数
// 获取用户ID
tools.getUserId = function () {
  return lib.getUserId()
}
// 获取用户名
tools.getUserName = function () {
  return lib.getUserName()
}

tools.install = function (Vue, options) {
  Vue.prototype.$tools = tools
  Vue.tools = tools
}
export default tools
